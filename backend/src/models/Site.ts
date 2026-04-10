import mongoose, { Document, Schema } from "mongoose";

/**
 * Represents a site in the system.
 * Each site has a name, location, status, and timezone.
 *
 * @interface ISite
 * @extends Document
 */
export interface ISite extends Document {
  /** The name of the site (e.g., "New York Office", "London Warehouse") */
  name: string;

  /** The location of the site (e.g., city, country) */
  location: string;

  /** The current status of the site: "active" or "inactive" */
  status: "active" | "inactive";

  /** The timezone of the site (e.g., "UTC", "PST", "EST") */
  timezone: string;
}

/**
 * Schema definition for the `Site` model.
 * The schema includes fields for the name, location, status, and timezone of the site.
 * Timestamps are enabled to track creation and update times.
 *
 * @type {Schema<ISite>}
 */
const siteSchema = new Schema<ISite>(
  {
    /** The name of the site (e.g., "New York Office", "London Warehouse") */
    name: { type: String, required: true },

    /** The location of the site (e.g., city, country) */
    location: { type: String, required: true },

    /** The current status of the site: "active" or "inactive" */
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    /** The timezone of the site (e.g., "UTC", "PST", "EST") */
    timezone: {
      type: String,
      required: true,
      default: "UTC",
    },
  },
  { timestamps: true }, // Automatically includes createdAt and updatedAt fields
);

/**
 * The Site model represents a physical or virtual site in the system.
 *
 * @type {mongoose.Model<ISite>}
 */
export default mongoose.model<ISite>("Site", siteSchema);
