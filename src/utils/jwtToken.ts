import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from 'dotenv';
 
// Load environment variables
dotenv.config(); 

// Constants for token expiration
const ACCESS_TOKEN_EXPIRES_IN = "15m"; // Access tokens typically have a short expiration time
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // Refresh tokens can have a longer expiration time
const SECURE_ALGORITH = "HS256" ;
const secretTokenKey = process.env.JWT_SECRET as string;


// Function to generate an access token
const generateAccessToken = (user: User) => {
  const payload = {
    sub: user.id,  
    iss: "E-commerce-System", 
    aud: "E-commerce-System",  
    nbf: Math.floor(Date.now() / 1000),  
    jti: `${user.id}-${Date.now()}`,  
    role: user.role,  
  };

  return jwt.sign(payload, secretTokenKey, {
    algorithm: SECURE_ALGORITH, // Use a secure algorithm
    expiresIn: ACCESS_TOKEN_EXPIRES_IN, // Set token expiration time
  });
};

// Function to generate a refresh token
const generateRefreshToken = (user: User) => {
  const payload = {
    sub: user.id,  
    iss: "E-commerce-System", 
    aud: "E-commerce-System",  
    nbf: Math.floor(Date.now() / 1000),  
    jti: `${user.id}-${Date.now()}`,  
    role: user.role,  
  };

  return jwt.sign(payload, secretTokenKey, {
    algorithm: SECURE_ALGORITH, // Use a secure algorithm
    expiresIn: REFRESH_TOKEN_EXPIRES_IN, // Set token expiration time
  });
};

// Function to decode and verify a JWT token
const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};


// Export the functions for use in other parts of the application
export { generateAccessToken, generateRefreshToken, decodeToken };
