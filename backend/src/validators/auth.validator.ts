import { LoginInput, SignupInput } from "../types/auth.types";

/**
 * Validates the signup input.
 * Ensures that all required fields are provided and that the password is long enough.
 *
 * @param signupData The data to validate (name, email, and password).
 * @throws Will throw an error if any field is missing or if the password is too short.
 */
export const validateSignup = ({ name, email, password }: SignupInput) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
};

/**
 * Validates the login input.
 * Ensures that both email and password are provided.
 *
 * @param loginData The data to validate (email and password).
 * @throws Will throw an error if any field is missing.
 */
export const validateLogin = ({ email, password }: LoginInput) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};
