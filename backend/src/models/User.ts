import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Interface (Type Safety)
/**
 * Represents a user in the system.
 * Each user has a name, email, password, role, site, and status.
 *
 * @interface IUser
 * @extends Document
 */
export interface IUser extends Document {
  /** The name of the user */
  name: string;

  /** The email of the user */
  email: string;

  /** The hashed password of the user */
  password: string;

  /** The role of the user (optional) */
  role?: mongoose.Types.ObjectId;

  /** The site associated with the user (optional) */
  site?: mongoose.Types.ObjectId;

  /** The current status of the user ("active" or "inactive") */
  status: "active" | "inactive";

  /**
   * Compares a plain-text password with the stored hashed password.
   *
   * @param password The plain-text password to compare.
   * @returns A promise that resolves to `true` if the passwords match, `false` otherwise.
   */
  comparePassword(password: string): Promise<boolean>;
}

// Schema
/**
 * Schema definition for the `User` model.
 * The schema includes fields for the user's name, email, password, role, site, and status.
 *
 * @type {Schema<IUser>}
 */
const userSchema: Schema<IUser> = new Schema(
  {
    /** The name of the user */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /** The email of the user */
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /** The hashed password of the user */
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    /** The role of the user, referenced from the `Role` collection */
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },

    /** The site associated with the user, referenced from the `Site` collection */
    site: {
      type: Schema.Types.ObjectId,
      ref: "Site",
    },

    /** The status of the user ("active" or "inactive") */
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true, // Automatically includes createdAt and updatedAt fields
  },
);

// Hash password before saving
/**
 * Pre-save middleware to hash the user's password before saving it to the database.
 *
 * @returns {Promise<void>} A promise that resolves when the password is hashed.
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
/**
 * Compares a plain-text password with the stored hashed password.
 *
 * @param password The plain-text password to compare.
 * @returns A promise that resolves to `true` if the passwords match, `false` otherwise.
 */
userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Model
/**
 * The User model represents a user in the system.
 *
 * @type {mongoose.Model<IUser>}
 */
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
