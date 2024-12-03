console.log("hello!");

import db from "./db/conn.mjs";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

//in order to use the grades.mjs for my routes
//i need

import grades from "./routes/grades.mjs";

// process .env is what allow me to access the .env
//PORT is what it was called in the .env file
const PORT = process.env.PORT || 5050;
const app = express();

//middleware

app.use(express.json());

//routes
//generic route
app.get("/", (req, res) => {
  res.send(
    "welcome to the API. Documentation could go here, or you could redirect to documentation"
  );
});
app.use("/api/grades", grades);

//global error handling
app.use((err, req, res, next) => {
  res.status(500).send("seems like we messed up somewhere");
});

//start the express app
app.listen(PORT, () => {
  console.log(`server is runing on port: ${PORT}`);
});
