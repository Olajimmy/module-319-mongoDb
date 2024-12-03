import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

const router = express.Router();

//FULL CRUD FUNCTIONALITY
//C- CREATE -POST
//R - READ - GET
//U - UPDATE - PUT/PATCH
//D - DELETE - DELETE

//for read, we usually do an index route and a show route
//Index displays or gets many db items

//------------------------------------------------
//                      All ROutes
//------------------------------------------------

//================post implements CREATE functionality===================

router.post("/", async (req, res) => {
  let collection = await db.collection("grades");

  //in order to use this, i need to add middleware to my index.mjs
  //we dont have a frontend , so we need to use a tool to test this
  //the tool we are goin to use is postman
  //use 'raw' and 'JSON' in the body of the postman to test this

  let newDocument = req.body;
  console.log(newDocument);
  let result = await collection.insertOne(newDocument);

  if (!result) res.send("not created").status(500);
  else res.send(result).status(201);
});

//   Get implements READ functionality---------------------------
//we want to be careful with this get route
//because it could be a huge amount of data
//      that is why we limit to 50 in this example
//          if you wanted to either use pagination or
//          somehow iterate through, you might combine limit(n) and skip(m)
// ===== make sure that you are using async-await
// because db access requests are asynchronous, but we need that data
// before we move on

router.get("/", async (req, res) => {
  let collection = await db.collection("grades");
  let results = await collection.find({}).limit(50).toArray();
  if (!results) res.send("not found").status(404);
  else res.send(results).status(200);
});

//the show route is READ, but limiting to a specific entry
//in this case, we'll use id to get a specific grades entry
router.get("/:id", async (req, res) => {
  let collection = await db.collection("grades");

  //define the query
  //in this query, we are searching for a specific id
  let query;
  try {
    query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    res.send("not an id").status(400);
  }
});

//what if we want all the grade entries for a given student

router.get("/student/:student_id", async (req, res) => {
  let collection = await db.collection("grades");

  let query = { student_id: Number(req.params.student_id) };
  console.log(query);
  //why is this an array? because we are exoecting more than one result
  let results = await collection.find(query).toArray();

  if (!results) res.send("not found").status(404);
  else res.send(results).status(200);
});

//delete an entry
router.delete("/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { _id: new ObjectId(req.params.id) };
  let results = await collection.deleteOne(query);
  if (!results) res.send("not created").status(500);
  else res.send(results).status(201);
});

export default router;
