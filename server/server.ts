require("dotenv").config();
import express = require("express");
import logger from "morgan";
import bodyParser from "body-parser";
import bookRouter from './routes/bookRoutes';
import loginRouter from './routes/loginRoutes';
import jwt, { VerifyErrors } from 'jsonwebtoken';

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

const authenticateToken = (request: any, response: any, next: any) => {
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log('token', token);
  if (token == null) return response.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (error: VerifyErrors | null, user: any) => {
    console.log(error)
    if (error) return response.sendStatus(403)
    request.user = user
    next()
  })
}

app.use(function(err: any, req: any, res: any, next: any) {
  // handle your errors
  if (err) {
    console.log('ERROR: ', err);
  }

  console.log('REQUEST: ', req);
});

app.use('/books', authenticateToken, bookRouter);
app.use('/login', loginRouter);

