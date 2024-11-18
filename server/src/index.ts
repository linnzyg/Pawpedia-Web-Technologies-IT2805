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

      const edges = breeds.slice(0, first).map((breed) => ({
        cursor: breed._id.toString(),
        node: {
          id: breed._id.toString(),
          name: breed.name,
          description: breed.description,
          slug: breed.slug,
          image: breed.image,
          size: breed.size,
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
      return (await collection.find().toArray()).filter((c) => c.breedId === parent._id.toString());
    },
  },
  Mutation: {
    addComment(_: any, args: { comment: { breedId: string; username?: string; comment: string; } }) {
      const collection = db.collection('Comment');
      const comment = {
        breedId: args.comment.breedId,
        username: args.comment.username,
        comment: args.comment.comment,
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
