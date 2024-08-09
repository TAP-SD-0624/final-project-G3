import { NextFunction, Request, Response } from 'express';
import errorHandler from '../utils/errorHandler';
import APIError from '../utils/APIError';

const signup = errorHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    return next(new APIError('something went wrong', 500));
    const m = "mahmoud";
  },
);

const login = errorHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    return next(new APIError('something went wrong', 500));
  },
);

const logout = errorHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    return next(new APIError('something went wrong', 500));
  },
);

export { signup, login, logout };
