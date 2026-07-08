import jwt from "jsonwebtoken";
import User from "../models/User";
import { validateSignup, validateLogin } from "../validators/auth.validator";
import { LoginInput, SignupInput } from "../types/auth.types";
import redisClient from "../config/redis";

const USER_CACHE_PREFIX = "user:";
const USER_CACHE_TTL = 60 * 60; 

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

  await redisClient.setEx(
    `${USER_CACHE_PREFIX}${email}`,
    USER_CACHE_TTL,
    JSON.stringify(user)
  );

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return { token, user };
};

export const login = async ({ email, password }: LoginInput) => {
  validateLogin({ email, password });

  let user: any;

  // 1. Try Redis first
  const cachedUser = await redisClient.get(`${USER_CACHE_PREFIX}${email}`);

  if (cachedUser) {
    user = User.hydrate(JSON.parse(cachedUser));
  } else {
    // 2. Fallback to MongoDB
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      throw new Error("Invalid credentials");
    }
    if (typeof userDoc.populate === "function") {
      await userDoc.populate("role");
    }
    user = userDoc;

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // 3. Cache the user
    await redisClient.setEx(
      `${USER_CACHE_PREFIX}${email}`,
      USER_CACHE_TTL,
      JSON.stringify(user)
    );
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: (user.role as any)?.name,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  if (user && typeof user.populate === "function") {
    delete user.populate;
  }
  return { token, user };
};