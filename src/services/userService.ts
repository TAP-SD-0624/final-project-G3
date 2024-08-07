import User from "../models/User";
import APIError from "../utils/APIError";

// Function to check if the email already exists
const checkIfEmailExists = async (email: string): Promise<boolean> => {
  const existingUser = await User.findOne({ where: { email } });
  return existingUser !== null;
};

// Function to check if the user exists and return the user
const checkIfUserExists = async (email: string): Promise<User> => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new APIError("User not found", 404);
  }
  return user;
};

export { checkIfEmailExists, checkIfUserExists };
