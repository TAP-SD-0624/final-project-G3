import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwtToken";
import User from "../models/User";
import APIError from "../utils/APIError";
import errorHandler from "../utils/errorHandler";


// Middleware to check if the user is authenticated
const authMiddleware = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
 
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new APIError("Unauthorized: No token provided", 401));
    }
    
    const token = authHeader.split(' ')[1];

    // Verify and decode token
    const decoded = decodeToken(token) as { sub: string }; // Adjust the type if necessary

    // Fetch user from database
    const user = await User.findByPk(decoded.sub);
    if (!user) {
      return next(new APIError("Unauthorized: User not found", 401));
    }

    // Attach user to request object
    (req as any).user = user;
    next();
 
} );



export default authMiddleware  ;
