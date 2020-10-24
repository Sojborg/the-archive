import express = require("express");
import logger from "morgan";
import bodyParser from "body-parser";
import bookRouter from './routes/bookRoutes';

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

app.use('/books', bookRouter);

