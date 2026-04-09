import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Interface (Type Safety)
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: mongoose.Types.ObjectId;
  site?: mongoose.Types.ObjectId;
  status: "active" | "inactive";
  comparePassword(password: string): Promise<boolean>;
}

//  Schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    site: {
      type: Schema.Types.ObjectId,
      ref: "Site",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

//  Compare password method
userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

//  Model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
