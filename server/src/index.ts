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
      { first, after, filterBySize, searchByName, orderBy }: { first: number; after?: string; filterBySize?: string[]; searchByName?: string; orderBy?: string }
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
    
      if (orderBy === 'lowestRating' || orderBy === 'highestRating') {
        // Joining Comment collection on Breed Collection to calculate ratings
        const pipeline: any[] = [
          { $match: query },
          {
            $lookup: {
              from: 'Comment',
              let: { breedId: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$breedId', { $toString: '$$breedId' }] }, // "foreign key" to breed collection in comment have different type than id in breed, so it must be converted
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
          { $sort: { averageRating: orderBy === 'lowestRating' ? 1 : -1 } },
          { $limit: first + 1 },
        ];
    
        if (after) {
          const afterFilter = {
            $match: {
              averageRating: { [orderBy === 'lowestRating' ? '$gt' : '$lt']: parseFloat(after) },
            },
          };
          pipeline.push(afterFilter);
        }
    
        const breeds = await collection.aggregate(pipeline).toArray();
        const hasNextPage = breeds.length > first;
    
        return createResponse(breeds, first, hasNextPage, orderBy);
      } else {
        if (after) {
          query.name = { [orderBy === 'asc' ? '$gt' : '$lt']: after };
        }
    
        const sortQuery: any = orderBy === 'desc' ? { name: -1 } : { name: 1 };
        const breeds = await collection.find(query).sort(sortQuery).limit(first + 1).toArray();
        const hasNextPage = breeds.length > first;
        // Calculate average rating for each breed
        for (const breed of breeds) {
          const comments = await db.collection('Comment').find({ breedId: breed._id.toString() }).toArray();
    
          // Filter out comments that do not have a rating
          const ratedComments = comments.filter(comment => comment.rating != null);
    
          if (ratedComments.length > 0) {
          const totalRating = ratedComments.reduce((sum, comment) => sum + comment.rating, 0);
          breed.averageRating = totalRating / ratedComments.length;
          } else {
          breed.averageRating = 0; 
          }}
    
        return createResponse(breeds, first, hasNextPage, orderBy);
      }
    },
    breed: async (_: any, args: any) => {
      const breed = await db.collection('Breed').findOne({ _id: ObjectId.createFromHexString(args.id) });
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

//Function to create the response structure of breeds query
const createResponse = (breeds: any[], first: number, hasNextPage: boolean, orderBy?: string) => {
  const edges = breeds.slice(0, first).map((breed) => ({
    cursor: orderBy === 'lowestRating' || orderBy === 'highestRating' ? breed.averageRating.toString() : (orderBy === 'asc' || orderBy === 'desc' ? breed.name : breed._id.toString()),
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
      issues: breed.issues
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
