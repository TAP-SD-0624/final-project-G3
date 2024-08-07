import { NextFunction, Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import APIError from "../utils/APIError";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/jwtToken";
import bcrypt from "bcryptjs";
import { checkIfEmailExists, checkIfUserExists } from "../services/userService";
import User from "../models/User";

const signup = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, dateOfBirth, password, role } =
      req.body;

    // Check if the email already exists
    if (await checkIfEmailExists(email)) {
      return next(new APIError("Email already in use", 401));
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      dateOfBirth,
      password: hashedPassword,
      role,
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      accessToken,
      refreshToken,
    });
  }
);

const login = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Check if the user exists and retrieve the user
    const user = await checkIfUserExists(email);

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new APIError("Invalid email or password", 401));
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({ message: "Logged in successfully", user, accessToken,
        refreshToken, });
  }
);

// Logout handler
const logout = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Clear cookies
    res.clearCookie("accessToken", { httpOnly: true, secure: isDevelopment });
    res.clearCookie("refreshToken", { httpOnly: true, secure: isDevelopment });

    // Send a response indicating successful logout
    res.status(200).json({ message: "Successfully logged out" });
  }
);

export { signup, login, logout };
