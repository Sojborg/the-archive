import express = require("express");
import logger from "morgan";
import { repository } from "./repository/repository";
import bodyParser from "body-parser";

// Create a new express app instance
const app: express.Application = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.listen(5000, function () {
  console.log("App is listening on port 5000!");
});

app.get("/books", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const books = await repository.queryCollection();
    res.send(JSON.stringify(books));
  } catch (e) {
    console.error(e);
  }
});

app.post("/savebook", (request, response) => {
  try {
    console.log(request.body);
    repository.getDocument(request.body);
    response.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});
