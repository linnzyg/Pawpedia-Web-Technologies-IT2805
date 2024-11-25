import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { typeDefs } from './schema';

const uri = 'mongodb://admin:1234@it2810-35.idi.ntnu.no:27017/admin';
const client = new MongoClient(uri);
let db: Db;

// Connect to MongoDB
const startMongo = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('admin');
  } catch (err) {
    console.error(err);
  }
};

startMongo();

const resolvers = {
  Query: {
    breeds: async (
      _: any,
      { first, after, filterBySize, searchByName, orderBy, skip }: 
      { first: number; after?: string; filterBySize?: string[]; searchByName?: string; orderBy?: string; skip?: number }
    ) => {
      const collection = db.collection('Breed');
      const query: any = {};
      
      // Filtering logic
      if (filterBySize && filterBySize.length > 0) {
        query.size = { $in: filterBySize };
      }
      if (searchByName) {
        query.name = { $regex: searchByName, $options: 'i' };
      }
      
      let pipeline: any[] = [];
      
      if (orderBy === 'lowestRating' || orderBy === 'highestRating') {
        const sortDirection = orderBy === 'lowestRating' ? 1 : -1;
        
        // Base pipeline with filtering and average rating calculation
        pipeline = [
          { $match: query },
          {
            $lookup: {
              from: 'Comment',
              let: { breedId: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$breedId', { $toString: '$$breedId' }] },
                  },
                },
              ],
              as: 'comments',
            },
          },
          {
            $addFields: {
              averageRating: {
                $cond: {
                  if: { $gt: [{ $size: '$comments' }, 0] },
                  then: { $avg: '$comments.rating' },
                  else: 0,
                },
              },
            },
          },
          { $sort: { averageRating: sortDirection, _id: 1 } }, // Secondary sort on _id
          
        ];
        console.log(skip);
        
        // Pagination filter if 'skip' is provided
        if (skip) {
          pipeline.push({ $skip: skip });
          pipeline.push({ $limit: first + 1 });
        } else {
          pipeline.push({ $limit: first + 1 });
        }         
      } else {
        // Handle name-based sorting (asc/desc) or default
        const sortDirection = orderBy === 'desc' ? -1 : 1;
        if (after) {
          query._id = { [sortDirection === 1 ? '$gt' : '$lt']: ObjectId.createFromHexString(after) };
        }
        pipeline = [
          { $match: query },
          { $sort: { name: sortDirection, _id: 1 } },
          { $limit: first + 1 },
        ];
      }
      console.log(pipeline);
      const breeds = await collection.aggregate(pipeline).toArray();
      console.log(breeds);
      const hasNextPage = breeds.length > first;

      return createResponse(breeds, first, hasNextPage, orderBy);
    },
    breed: async (_: any, args: any) => {
      const breed = await db
        .collection('Breed')
        .findOne({ _id: ObjectId.createFromHexString(args.id) });
      return breed;
    },
  },
  Breed: {
    async comments(parent: any) {
      const collection = db.collection('Comment');
      return await collection
        .find({ breedId: parent._id.toString() })
        .sort({ rating: -1 })
        .toArray();
    },
  },
  Mutation: {
    addComment: async (
      _: any,
      args: { comment: { breedId: string; username?: string; comment: string; rating: number } }
    ) => {
      const collection = db.collection('Comment');
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
const createResponse = (breeds: any[], first: number, hasNextPage: boolean, orderBy?: string) => {
  const edges = breeds.slice(0, first).map((breed) => ({
    cursor:
      orderBy === 'lowestRating' || orderBy === 'highestRating'
        ? ( breed.averageRating ? breed.averageRating.toString() : '0' )
        : orderBy === 'asc' || orderBy === 'desc'
        ? breed.name
        : breed._id.toString(),
    node: {
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
    },
  }));

  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor,
    },
    totalCount: breeds.length, // Adjust this as needed
  };
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server ready at ${url}`);
};

startServer();
