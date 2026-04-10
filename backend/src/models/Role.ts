import mongoose, { Document, Schema } from "mongoose";

/**
 * Represents the role of a user in the system.
 * Each role has a name and a list of permissions associated with it.
 *
 * @interface IRole
 * @extends Document
 */
export interface IRole extends Document {
  /** The name of the role (e.g., "Admin", "User") */
  name: string;

  /** A list of permissions associated with this role */
  permissions: string[];
}

/**
 * Schema definition for the `Role` model.
 * The schema includes a name field (which is unique) and a list of permissions.
 * Timestamps are enabled to track creation and update times.
 *
 * @type {Schema<IRole>}
 */
const roleSchema = new Schema<IRole>(
  {
    /** The name of the role (e.g., "Admin", "User") */
    name: { type: String, required: true, unique: true },

    /** A list of permissions associated with this role */
    permissions: [{ type: String }],
  },
  { timestamps: true }, // Automatically includes createdAt and updatedAt fields
);

/**
 * The Role model represents a user role in the system, using the defined schema.
 *
 * @type {mongoose.Model<IRole>}
 */
export default mongoose.model<IRole>("Role", roleSchema);
