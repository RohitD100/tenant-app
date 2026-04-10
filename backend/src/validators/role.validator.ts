import { z } from "zod";
import { PERMISSIONS } from "../constants/permissions";

/**
 * Schema to validate the creation of a new role.
 *
 * The schema ensures that the role has a valid name (at least 3 characters) and
 * a non-empty array of valid permissions.
 *
 * @typedef {object} CreateRoleSchema
 * @property {string} name - The name of the role (must be at least 3 characters long).
 * @property {Array<string>} permissions - A list of permissions associated with the role.
 *   The list must contain only valid permissions from the `PERMISSIONS` object and cannot be empty.
 */
export const createRoleSchema = z.object({
  /** The name of the role (e.g., "Admin", "User") */
  name: z.string().min(3, "Role name must be at least 3 characters long"),

  /** A list of permissions associated with this role. It must contain valid permission values. */
  permissions: z
    .array(z.enum(Object.values(PERMISSIONS))) // Ensures each permission is valid
    .nonempty("Permissions cannot be empty"), // Permissions array must not be empty
});

/**
 * Schema to validate the update of an existing role.
 *
 * The schema allows for optional updates to the role's name and/or permissions.
 * It ensures that if any fields are provided, they must be valid according to the rules for creating a new role.
 *
 * @typedef {object} UpdateRoleSchema
 * @property {string} [name] - The updated name of the role (optional). Must be at least 3 characters long if provided.
 * @property {Array<string>} [permissions] - The updated list of permissions associated with the role (optional).
 *   The list must contain only valid permissions from the `PERMISSIONS` object and cannot be empty if provided.
 */
export const updateRoleSchema = z.object({
  /** The name of the role (optional, must be at least 3 characters long if provided) */
  name: z
    .string()
    .min(3, "Role name must be at least 3 characters long")
    .optional(),

  /** The list of permissions associated with the role (optional) */
  permissions: z
    .array(z.enum(Object.values(PERMISSIONS))) // Ensures each permission is valid
    .nonempty("Permissions cannot be empty") // Permissions array must not be empty if provided
    .optional(),
});
