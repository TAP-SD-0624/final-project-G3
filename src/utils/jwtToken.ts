import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from 'dotenv';
  
dotenv.config(); 
 
const TOKEN_EXPIRES_IN = "1m";   
const SECURE_ALGORITH = "HS256" ; // (Hash-based Message Authentication Code) with SHA-256 hashing
const ECOMMERCE_SYSTEM = "E-commerce-System";
const secretTokenKey = process.env.JWT_SECRET as string;


const generateToken = (user: User) => {
  const payload = {
    sub: user.id,  
    iss: ECOMMERCE_SYSTEM, 
    aud: ECOMMERCE_SYSTEM,  
    nbf: Math.floor(Date.now() / 1000),  
    jti: `${user.id}-${Date.now()}`,  // JWT ID. + date
    role: user.role,  
  };

  return jwt.sign(payload, secretTokenKey, {
    algorithm: SECURE_ALGORITH, 
    expiresIn: TOKEN_EXPIRES_IN, 
  });
};
 

const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};


export { generateToken , decodeToken };
