import jwt from "jsonwebtoken";
import User from "../models/User";
import { validateSignup, validateLogin } from "../validators/auth.validator";
import { LoginInput, SignupInput } from "../types/auth.types";

/**
 * Creates a new user account and returns an authentication token.
 *
 * Steps:
 * - Validates input data
 * - Checks if email already exists
 * - Creates user in database
 * - Generates JWT token
 *
 * @param {SignupInput} param0 - User signup data
 * @param {string} param0.name - Full name of the user
 * @param {string} param0.email - Email address of the user
 * @param {string} param0.password - Plain text password
 *
 * @returns {Promise<{token: string, user: any}>} JWT token and created user
 *
 * @throws {Error} If validation fails or email already exists
 */
export const signup = async ({ name, email, password }: SignupInput) => {
  validateSignup({ name, email, password });

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return { token, user };
};

/**
 * Authenticates a user and returns a JWT token.
 *
 * Steps:
 * - Validates input credentials
 * - Finds user by email
 * - Verifies password
 * - Generates JWT token with role info
 *
 * @param {LoginInput} param0 - Login credentials
 * @param {string} param0.email - User email
 * @param {string} param0.password - User password
 *
 * @returns {Promise<{token: string, user: any}>} JWT token and authenticated user
 *
 * @throws {Error} If credentials are invalid
 */
export const login = async ({ email, password }: LoginInput) => {
  validateLogin({ email, password });

  const user = await User.findOne({ email }).populate("role");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: (user.role as any)?.name },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  return { token, user };
};
