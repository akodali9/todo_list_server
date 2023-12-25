const express = require("express");
const Authrouter = require("./features/auth");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const noteupdaterouter = require("./features/noteupdate");
const app = express();
const MongoApiLink = require("./apikeys");
const port = 3000;

const DB =
  `mongodb+srv://${MongoApiLink}/?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use("/auth", Authrouter);
app.use("/feature", noteupdaterouter);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection Succesfull");
  })
  .catch((e) => {
    console.log(`message ${e}`);
  })

app.get("/", (req, res) => {
  console.log("hello world!");
  res.send({ greeting: "hello" });
});

app.listen(port, "0.0.0.0", () => {
  console.log("Express app running!");
});