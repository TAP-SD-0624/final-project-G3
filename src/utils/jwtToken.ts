import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";
import errorHandler from "../utils/errorHandler";

dotenv.config();

const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || "1m";
const SECURE_ALGORITH = process.env.SECURE_ALGORITH || "HS256";
const ECOMMERCE_SYSTEM = process.env.ECOMMERCE_SYSTEM || "E-commerce-System";
const secretTokenKey = process.env.JWT_SECRET as string;

const generateToken = (user: User) => {
  const payload = {
    sub: user.id,
    iss: ECOMMERCE_SYSTEM,
    aud: ECOMMERCE_SYSTEM,
    nbf: Math.floor(Date.now() / 1000),
    jti: `${user.id}-${Date.now()}`, // JWT ID. + date
    role: user.role,
  };

  return jwt.sign(payload, secretTokenKey, {
    algorithm: SECURE_ALGORITH as jwt.Algorithm, // Ensure SECURE_ALGORITH is a valid Algorithm type
    expiresIn: TOKEN_EXPIRES_IN,
  });
};

const decodeToken =
  (token: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  };

export { generateToken, decodeToken };
