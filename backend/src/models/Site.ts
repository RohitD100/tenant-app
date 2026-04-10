import mongoose, { Document, Schema } from "mongoose";

export interface ISite extends Document {
  name: string;
  location: string;
  status: "active" | "inactive";
  timezone: string;
}

const siteSchema = new Schema<ISite>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    timezone: {
      type: String,
      required: true,
      default: "UTC",
    },
  },
  { timestamps: true },
);

export default mongoose.model<ISite>("Site", siteSchema);
