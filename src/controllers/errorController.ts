import { Request, Response } from 'express';
import APIError from '../utils/APIError';

const errorController = (err: Error, req: Request, res: Response): void => {
  if (err instanceof APIError) {
    res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

export default errorController;
