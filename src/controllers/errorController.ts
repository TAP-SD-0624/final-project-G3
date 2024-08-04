import { Request, Response, NextFunction } from 'express';
import APIError from '../utils/APIError';

const errorController = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof APIError)
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message
    });
    res.status(500).json({
        status: 'error',
        message: err.message
    });
}

export default errorController;