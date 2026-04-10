/**
 * Defines the available permissions in the system.
 * Permissions are grouped by resource type, such as users, roles, and sites.
 *
 * @constant
 */
export const PERMISSIONS = {
  /** Permission to create a user */
  CREATE_USER: "CREATE_USER",

  /** Permission to read a user */
  READ_USER: "READ_USER",

  /** Permission to update a user */
  UPDATE_USER: "UPDATE_USER",

  /** Permission to delete a user */
  DELETE_USER: "DELETE_USER",

  /** Permission to create a role */
  CREATE_ROLE: "CREATE_ROLE",

  /** Permission to read a role */
  READ_ROLE: "READ_ROLE",

  /** Permission to update a role */
  UPDATE_ROLE: "UPDATE_ROLE",

  /** Permission to delete a role */
  DELETE_ROLE: "DELETE_ROLE",

  /** Permission to create a site */
  CREATE_SITE: "CREATE_SITE",

  /** Permission to read a site */
  READ_SITE: "READ_SITE",

  /** Permission to update a site */
  UPDATE_SITE: "UPDATE_SITE",

  /** Permission to delete a site */
  DELETE_SITE: "DELETE_SITE",
};
