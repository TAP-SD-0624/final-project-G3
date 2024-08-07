import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwtToken";
import User from "../models/user";
import APIError from "../utils/APIError";
import errorHandler from "../utils/errorHandler";

const authMiddleware = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new APIError("Unauthorized: No token provided", 401));
    }

    const token = authHeader.split(" ")[1];

    const decoded = decodeToken(token) as { sub: string };

    const user = await User.findByPk(decoded.sub);
    if (!user) {
      return next(new APIError("Unauthorized: User not found", 401));
    }

    (req as any).user = user;
    next();
  }
);

export default authMiddleware;
