import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Db, MongoClient, ObjectId } from "mongodb";
import { typeDefs } from "./schema";

const uri = "mongodb://admin:1234@it2810-35.idi.ntnu.no:27017/admin";
const client = new MongoClient(uri);
let db: Db;

// Connect to MongoDB
const startMongo = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("admin");
  } catch (err) {
    console.error(err);
  }
};

startMongo();

const resolvers = {
  Query: {
    breeds: async (
      _: any,
      {
        first,
        filterBySize,
        filterByStat,
        searchByName,
        orderBy,
        skip,
      }: {
        first: number;
        filterBySize?: string[];
        filterByStat?: string[];
        searchByName?: string;
        orderBy?: string;
        skip?: number;
      },
    ) => {
      const collection = db.collection("Breed");
      const query: any = {};

      // Filtering size logic
      if (filterBySize && filterBySize.length > 0) {
        query.size = { $in: filterBySize };
      }

      // Filtering stats logic
      if (filterByStat && filterByStat.length > 0) {
        if (filterByStat.includes("allergy")) {
          query.allergy = { $gte: 4 };
        }
        if (filterByStat.includes("weight")) {
          query.weight = { $lte: 8 };
        }
        if (filterByStat.includes("energy")) {
          query.energy = { $gte: 4 };
        }
      }

      if (searchByName) {
        query.name = { $regex: searchByName, $options: "i" };
      }

      let pipeline: any[] = [];

      if (orderBy === "lowestRating" || orderBy === "highestRating") {
        const sortDirection = orderBy === "lowestRating" ? 1 : -1;

        // Base pipeline with filtering and average rating calculation
        pipeline = [
          { $match: query },
          {
            $lookup: {
              from: "Comment",
              let: { breedId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$breedId", { $toString: "$$breedId" }] }, // Convert ObjectId to string for comparison
                  },
                },
              ],
              as: "comments",
            },
          },
          {
            $addFields: {
              averageRating: {
                $cond: {
                  if: { $gt: [{ $size: "$comments" }, 0] },
                  then: { $avg: "$comments.rating" },
                  else: 0,
                },
              },
            },
          },
          { $sort: { averageRating: sortDirection, _id: 1 } }, // Secondary sort on _id
        ];

        // Pagination filter if 'skip' is provided
        if (skip) {
          pipeline.push({ $skip: skip });
        }
        pipeline.push({ $limit: first + 1 });
      } else {
        // Handle sorting
        // Default sorting is alphabetically by name
        let sortDirection: { [key: string]: number } = { name: 1, _id: 1 };
        if (orderBy === "desc") {
          sortDirection = { name: -1, _id: 1 };
        } else if (orderBy === "lifespan") {
          sortDirection = { lifespan: -1, _id: 1 };
        } else if (orderBy === "trainability") {
          sortDirection = { trainability: -1, _id: 1 };
        } else if (orderBy === "friendliness") {
          sortDirection = { friendliness: -1, _id: 1 };
        }

        pipeline = [
          { $match: query },
          { $sort: sortDirection },
          { $skip: skip ?? 0 },
          { $limit: first + 1 },
        ];
      }
      const breeds = await collection.aggregate(pipeline).toArray();
      const hasNextPage = breeds.length > first;

      //Add average rating to fetched breeds
      for (const breed of breeds) {
        breed.averageRating = await getAverageRating(breed._id.toString());
      }

      return createResponse(breeds, first, hasNextPage, orderBy);
    },
    breed: async (_: any, args: any) => {
      const breed = await db
        .collection("Breed")
        .findOne({ _id: ObjectId.createFromHexString(args.id) });
      if (breed)
        breed.averageRating = await getAverageRating(breed._id.toString());
      return breed;
    },
    randomBreed: async () => {
      const collection = db.collection("Breed");
      const breeds = await collection.find().toArray();
      const randomIndex = Math.floor(Math.random() * breeds.length);
      const breedId = breeds[randomIndex]._id.toString();
      return {
        id: breedId,
      };
    },
  },
  Breed: {
    async comments(parent: any) {
      const collection = db.collection("Comment");
      return await collection
        .find({ breedId: parent._id.toString() })
        .sort({ rating: -1 })
        .toArray();
    },
  },
  Mutation: {
    addComment: async (
      _: any,
      args: {
        comment: {
          breedId: string;
          username?: string;
          comment: string;
          rating: number;
        };
      },
    ) => {
      const collection = db.collection("Comment");
      const comment = {
        breedId: args.comment.breedId,
        username: args.comment.username,
        comment: args.comment.comment,
        rating: args.comment.rating,
        timestamp: new Date().toISOString(),
      };
      await collection.insertOne(comment);
      return comment;
    },
  },
};

// Function to create the response structure of breeds query
const createResponse = (
  breeds: any[],
  first: number,
  hasNextPage: boolean,
  orderBy?: string,
) => {
  const edges = breeds.slice(0, first).map((breed) => ({
    id: breed._id.toString(),
    name: breed.name,
    description: breed.description,
    image: breed.image,
    slug: breed.slug,
    size: breed.size,
    averageRating: breed.averageRating ?? null,
    weight: breed.weight,
    height: breed.height,
    lifespan: breed.lifespan,
    trainability: breed.trainability,
    friendliness: breed.friendliness,
    allergy: breed.allergy,
    energy: breed.energy,
    issues: breed.issues,
  }));

  return {
    edges,
    hasNextPage,
  };
};

// Function to calculate the average rating for a breed
const getAverageRating = async (breedId: string) => {
  const comments = await db
    .collection("Comment")
    .find({ breedId: breedId })
    .toArray();

  // Filter out comments that do not have a rating
  const ratedComments = comments.filter((comment) => comment.rating != null);

  if (ratedComments.length > 0) {
    const totalRating = ratedComments.reduce(
      (sum, comment) => sum + comment.rating,
      0,
    );
    return totalRating / ratedComments.length;
  }
  return null;
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3001 },
  });
  console.log(`Server ready at ${url}`);
};

startServer();
