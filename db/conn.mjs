//this is where i connect to my mongodb
//remember that it is hosted outside of my computer
import { MongoClient } from "mongodb";

//this is allowing me to access the thing that are in the .env files
//so that i can use sensitive info in my app but not upload it to github

import dotenv from "dotenv";
dotenv.config();

// this is creating a new mongoDBclient
// we are accessing our .env file (process.env)
// we are trying to access ATLAS_URI
// make sure this is in your .env
const client = new MongoClient(process.env.ATLAS_URI);

let conn;
try {
  conn = await client.connect();
  console.log("connected");
} catch (err) {
  console.log(err);
}

//we are accessing the sample training data in the mongodb compass sample data

let db = conn.db("sample_training");
//console.log(db);
export default db;
