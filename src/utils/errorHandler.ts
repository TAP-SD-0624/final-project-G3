import { NextFunction, Request, Response } from "express";

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => { 
    fn(req, res, next).catch((err: Error) => next(err));
}; // to wrap controllers calls in a call that has a catch nested to it so errors will be moved to the global error hanlder

export default errorHandler;
