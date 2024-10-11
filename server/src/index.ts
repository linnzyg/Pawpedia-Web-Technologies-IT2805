import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { Db, MongoClient } from 'mongodb';

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

const typeDefs = `#graphql
  type ImageObject {
    filename: String!
    contentType: String!
    gridFSId: String!
  }
  type Breeds {
    id: ID!
    name: String!
    description: String!
    image: ImageObject!
    slug: String!
    size: String!
  }

  type Query {
    breeds: [Breeds!]!
  }
`;

const resolvers = {
    Query: {
      breeds: async () => {
        const collection = db.collection('Breeds');
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
    },
  };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageDisabled()],
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
