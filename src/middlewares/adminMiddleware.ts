import { Request, Response, NextFunction } from 'express';
import APIError from '../utils/APIError';
import User from '../models/User';
import errorHandler from '../utils/errorHandler';

const adminMiddleware = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as User;

    if (!user) {
      return next(new APIError('Unauthorized: User not found', 401));
    }

    if (user.role !== 'admin') {
      return next(new APIError('Forbidden: Access Denied ', 403));
    }

    next();
  },
);

export default adminMiddleware;
