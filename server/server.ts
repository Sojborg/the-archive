import express = require("express");
import logger from "morgan";
import { repository } from "./repository/repository";
import bodyParser from "body-parser";
import { googleBooksService } from "./services/google-books-service";

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

app.get("/numberofbooks", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const count = await repository.countCollection();
    const payload = {numberOfBooks: count};
    res.send(JSON.stringify(payload));
  } catch (e) {
    console.error(e);
  }
});

app.post("/addbooktolist", async (request, response) => {
  try {
    console.log(request.body);
    await repository.getDocument(request.body);
    const numberOfBooksCount = await repository.countCollection();
    const payload = {numberOfBooks: numberOfBooksCount};
    response.send(JSON.stringify(payload));
  } catch (e) {
    console.error(e);
  }
});

app.post("/savebook", (request, response) => {
  try {
    console.log(request.body);
    repository.replaceFamilyDocument(request.body);
    response.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});

app.post("/removebook", (request, response) => {
  try {
    console.log('BODY', request.body);
    const data = request.body
    console.log(data);
    repository.deleteFamilyDocument(data.id);
    response.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});

app.get('/searchbook', async (request, response) => {
  console.log('request', request.query.q);
  const searchQuery = encodeURI(request.query.q as string) ;
  console.log('searchQuery', searchQuery);
  const books = await googleBooksService.query(searchQuery);
  response.send(JSON.stringify(books));
});