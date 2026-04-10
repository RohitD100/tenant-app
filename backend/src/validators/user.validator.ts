import { z } from "zod";

/**
 * Validation schema for creating a new user.
 * Ensures that all required fields (name, email, password, status) are provided
 * and that the password meets the minimum length requirement.
 */
export const createUserSchema = z.object({
  /** The name of the user */
  name: z.string().min(3, "Name must be at least 3 characters long"),

  /** The email of the user */
  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters long"),

  /** The password of the user */
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),

  /** The role of the user (optional) */
  role: z.string().optional(), // Can be ObjectId as string or skip entirely

  /** The site associated with the user (optional) */
  site: z.string().optional(), // Can be ObjectId as string or skip entirely

  /** The status of the user ("active" or "inactive") */
  status: z.enum(["active", "inactive"]).default("active"),
});

/**
 * Validation schema for updating an existing user.
 * All fields are optional, allowing partial updates.
 */
export const updateUserSchema = z.object({
  /** The name of the user (optional, must be at least 3 characters long if provided) */
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),

  /** The email of the user (optional, must be a valid email format if provided) */
  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters long")
    .optional(),

  /** The password of the user (optional, with validation if provided) */
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")
    .optional(),

  /** The role of the user (optional, can be ObjectId as string or skip entirely) */
  role: z.string().optional(),

  /** The site associated with the user (optional) */
  site: z.string().optional(),

  /** The status of the user ("active" or "inactive") */
  status: z.enum(["active", "inactive"]).optional(),
});
