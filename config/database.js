import { MongoClient, ServerApiVersion } from "mongodb";

const {MONGO_DB_URI,  MONGO_DB_DATABASE} = process.env;

const client = new MongoClient(MONGO_DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });





// Create a MongoClient with a MongoClientOptions object to set the Stable API version


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {

    console.log('Error: error');
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}


run().catch(console.dir);

export const db = client.db(MONGO_DB_DATABASE)


























































