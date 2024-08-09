import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/jwtToken';
import User from '../models/User';
import APIError from '../utils/APIError';
import errorHandler from '../utils/errorHandler';

const authMiddleware = errorHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new APIError('Unauthorized: No token provided', 401));
    }

    let token = authHeader.split(' ')[1];
    // If not found in the header, try to get it from cookies
    if (!token) {
      token = req.cookies?.token;
    }

    // If token is still not found
    if (!token) {
      return next(new APIError('Unauthorized: No token provided', 401));
    }

    const decoded: any = await decodeToken(token);
    const userId = decoded.sub;
    const user = await User.findByPk(userId);

    if (!user) {
      return next(new APIError('Unauthorized: User not found', 401));
    }

    (req as any).user = user;
    next();
  },
);

export default authMiddleware;
