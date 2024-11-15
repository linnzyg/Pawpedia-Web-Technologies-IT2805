import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { typeDefs } from './schema';

const uri = 'mongodb://admin:1234@it2810-35.idi.ntnu.no:27017/admin';
const client = new MongoClient(uri);
let db: Db;

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
    breeds: async (_: any, { first, after, filterBySize, searchByName }: { first: number; after?: string; filterBySize?: string[]; searchByName?: string; }) => {
      const collection = db.collection('Breed');
      const query: any = {};

      if (after) {
        query._id = { $gt: new ObjectId(after) };
      }

      if (filterBySize && filterBySize.length > 0) {
        query.size = { $in: filterBySize };
      }

      if (searchByName) {
        query.name = { $regex: searchByName, $options: 'i' };
      }

      const breeds = await collection.find(query).limit(first + 1).toArray();

      // Calculate average rating for each breed
      for (const breed of breeds) {
        const comments = await db.collection('Comment').find({ breedId: breed._id.toString() }).toArray();
        if (comments.length > 0) {
          const totalRating = comments.reduce((sum, comment) => sum + (comment.rating || 0), 0);
          breed.averageRating = totalRating / comments.length;
        } else {
          breed.averageRating = 0; 
        }
      }

      const edges = breeds.slice(0, first).map((breed) => ({
        cursor: breed._id.toString(),
        node: {
          id: breed._id.toString(),
          name: breed.name,
          description: breed.description,
          image: breed.image,
          slug: breed.slug,
          size: breed.size,
          averageRating: breed.averageRating,
        },
      }));

      const hasNextPage = breeds.length > first;
      const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
        totalCount: await collection.countDocuments(query),
      };
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
    addComment(_: any, args: { comment: { breedId: string; username?: string; comment: string; rating: number } }) {
      const collection = db.collection('Comment');
      const comment = {
        breedId: args.comment.breedId,
        username: args.comment.username,
        comment: args.comment.comment,
        rating: args.comment.rating, 
        timestamp: new Date().toISOString(),
      };
      collection.insertOne(comment);
      return comment;
    },
  },
};
// Create Apollo Server instance with type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server ready at ${url}`);
};

startServer();
