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
    console.log('🚀 Connected to MongoDB');
    db = client.db('admin');
  } catch (err) {
    console.error(err);
  }
};

startMongo();

const resolvers = {
    Query: {
      breeds: async () => {
        const collection = db.collection('Breed');
        const breeds = await collection.find().toArray();
        return breeds.map((breed) => ({
            id: breed._id.toString(), // Convert ObjectId to string
            name: breed.name,
            description: breed.description,
            image: breed.image,
            slug: breed.slug,
            size: breed.size,
          }));
      },
      breed: async (_: any, args: any) => {
        const breed = await db.collection('Breed').findOne({ _id: ObjectId.createFromHexString(args.id) });
        return breed
      }
    },
    Breed: {
        async comments(parent: any) {
            const collection = db.collection('Comment');
            return (await collection.find().toArray()).filter((c) => c.breedId === parent._id.toString());
        }
      }
  };

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
