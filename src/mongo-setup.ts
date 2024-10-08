/*
 * Author: Amir Daneshmand (amirdaneshmand22@gmail.com *
 *
 * NOTE: Code was taken from official MongoDB website. */

import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "dotenv";

// Config environment variables
config();

const mongo_uri: string = process.env.MONGO_URI;

const mongo_client: MongoClient = new MongoClient(mongo_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Just sends a authorized ping
export default async (): Promise<void> => {
  try {
    // Provide a stable connection to the database
    await mongo_client.connect();
    // Send a authenticated ping to the db
    await mongo_client.db("admin").command({ ping: 1 });
    // Log success message to the console in green color of the text
    console.log("\x1b[32m%s\x1b[0m", "Successfully connected to the MongoBD.");
  } catch (error: unknown) {
    console.log(`Error occurred when connecting to MongoDB: ${error}.`);
  } finally {
    // Connection closses regardles of the connection result
    mongo_client.close();
  }
};
