/**
 * Represents a user's role in the application.
 * 
 * The `Role` interface defines the structure of a role object, which includes an identifier,
 * a name, and a list of permissions associated with that role.
 */
export interface Role {
  /**
   * Unique identifier for the role. It can be a string or null if the role hasn't been assigned an ID.
   * 
   * This is useful for storing or referencing the role in a database or for API calls.
   */
  id: string | null;

  /**
   * The name of the role.
   * 
   * This is typically a human-readable string like "Admin", "User", "Guest", etc.
   */
  name: string;

  /**
   * A list of permissions associated with the role.
   * 
   * This array contains strings representing the permissions granted to the role, such as "read", "write", "delete", etc.
   * Each permission can correspond to specific actions within the application.
   */
  permissions: string[];
}