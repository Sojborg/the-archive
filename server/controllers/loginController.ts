require("dotenv").config();
import jwt, { VerifyErrors } from "jsonwebtoken";

let refreshTokens: string[] = [];

export const login = async (request: any, response: any) => {
  // auth user
  console.log('body', request.body)

  const username = request.body.username;
  const user = { name: username};

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!);
  refreshTokens.push(refreshToken);
  response.json({accessToken, refreshToken});
}


const generateAccessToken = (user: any) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '30s' })
}