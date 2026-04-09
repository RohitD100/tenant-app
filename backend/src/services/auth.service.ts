import jwt from "jsonwebtoken";
import User from "../models/User";
import { validateSignup, validateLogin } from "../validators/auth.validator";

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

//  SIGNUP
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

//  LOGIN
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
