require("dotenv").config();
import express from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import logger from "morgan";
import bodyParser from "body-parser";

const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let refreshTokens: string[] = [];

app.post('/login', (request, response) => {
  // auth user
  console.log('body', request.body)

  const username = request.body.username;
  const user = { name: username};

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!);
  refreshTokens.push(refreshToken);
  response.json({accessToken, refreshToken});
});

app.delete('/logout', (request, response) => {
  refreshTokens = refreshTokens.filter(token => token !== request.body.token);
  response.sendStatus(204);
});

app.post("/token", (request, response) => {
  const refreshToken = request.body.token;
  if (refreshToken == null) {
    return response.sendStatus(401);
  }

  if (!refreshToken.includes(refreshToken)) {
    return response.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: VerifyErrors | null, user: any) => {
    if (err) {
      return response.sendStatus(403);
    }
    const accessToken = generateAccessToken({name: user.name});
    response.json({accessToken});
  })
});

const generateAccessToken = (user: any) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '30s' })
}

app.listen(4000);