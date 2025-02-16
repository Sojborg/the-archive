import jwt from "jsonwebtoken";
import * as argon2 from 'argon2';
import { userRepository } from "../repository/UserRepository";
import { IUser } from "../models/User";
require("dotenv").config();

let refreshTokens: string[] = [];

export const signUp = async (request: any, response: any) => {
  const username = request.body.username;
  const password = request.body.password;

  const passwordHashed = await argon2.hash(password);

  const user: IUser = {
    username,
    password: passwordHashed
  };

  await userRepository.createUser(user);

  response.json({username})
}

export const login = async (request: any, response: any) => {
  const username = request.body.username;
  const password = request.body.password;

  const user = await userRepository.getUserByUsername(username);

  if (!user) {
    return response.sendStatus(401);
  }

  const correctPassword = await argon2.verify(user.password, password);

  if (correctPassword) {
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign({name: user.username}, process.env.REFRESH_TOKEN_SECRET!);
    refreshTokens.push(refreshToken);
    response.json({accessToken, refreshToken});
  } else {
    return response.sendStatus(401);
  }
}

const generateAccessToken = (user: any) => {
  return jwt.sign({name: user.username}, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '10m' })
}