import { NextFunction, Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import APIError from "../utils/APIError";
import { generateToken } from "../utils/jwtToken";
import bcrypt from "bcryptjs";
import { checkIfEmailExists, checkIfUserExists } from "../services/userService";
import User from "../models/user";

const signup = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, dateOfBirth, password, role } =
      req.body;

    if (await checkIfEmailExists(email)) {
      return next(new APIError("Email already in use", 401));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      dateOfBirth,
      password: hashedPassword,
      role,
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token,
    });
  }
);

const login = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await checkIfUserExists(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new APIError("Invalid email or password", 401));
    }

    const token = generateToken(user);

    res
      .status(200)
      .json({ message: "Logged in successfully", user, token });
  }
);

// Logout handler
const logout = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isDevelopment = process.env.NODE_ENV === "development";
    res.clearCookie("Token", { httpOnly: true, secure: isDevelopment });
    res.status(200).json({ message: "Successfully logged out" });
  }
);

export { signup, login, logout };
