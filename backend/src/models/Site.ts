import mongoose, { Document, Schema } from "mongoose";

export interface ISite extends Document {
  name: string;
  location: string;
  status: "active" | "inactive";
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
  },
  { timestamps: true },
);

export default mongoose.model<ISite>("Site", siteSchema);
