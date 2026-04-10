/**
 * The `User` type defines the structure of a user object in the system.
 * It contains basic information about the user, including their identity,
 * status, and the associated role and site (optional).
 */
export type User = {
  /**
   * Unique identifier for the user.
   */
  id: string;

  /**
   * The user's full name.
   */
  name: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's role within the application (optional).
   * This is a string that corresponds to the role the user holds (e.g., "admin", "user").
   * It could be related to a `Role` type if needed.
   */
  role?: string;

  /**
   * The site associated with the user (optional).
   * This is a string that could represent a site or organization the user is linked to.
   */
  site?: string;

  /**
   * The current status of the user, indicating whether the user is active or inactive.
   * `active` means the user is currently allowed to interact with the system, while
   * `inactive` means the user is not permitted to perform actions.
   */
  status: "active" | "inactive";

  /**
   * The date when the user was created in the system (optional).
   * This is typically stored as an ISO string.
   */
  createdAt?: string;

  /**
   * The date when the user information was last updated (optional).
   * This is typically stored as an ISO string.
   */
  updatedAt?: string;
};

/**
 * The `UserContextType` defines the shape of the context that holds the user state
 * and authentication-related logic in the app.
 * This context will provide the current user, login status, and actions for managing the user.
 */
export type UserContextType = {
  /**
   * The current user object. This will either be a `User` object or `null` if no user is logged in.
   */
  user: User | null;

  /**
   * A boolean flag that indicates whether the user is logged in.
   * `true` means the user is logged in, `false` means they are not.
   */
  isLoggedIn: boolean;

  /**
   * A boolean flag that indicates whether the user data is currently being loaded.
   * This can be used to show loading states when fetching user data.
   */
  loading: boolean;

  /**
   * A function to set the current user object. It can accept either a `User` object
   * or `null` to log the user out.
   *
   * @param user - The user object to be set or `null` to remove the current user.
   */
  setUser: (user: User | null) => void;

  /**
   * A function that logs the user out of the application. This typically removes user
   * data from the context and could also clear authentication tokens.
   */
  logout: () => void;

  /**
   * A list of `Role` objects that represent the available roles in the system.
   * This could be used for things like assigning roles or managing permissions.
   */
  roles: Role[];

  /**
   * A list of `Site` objects that represent the available sites or organizations
   * the user can be associated with.
   */
  sites: Site[];

  /**
   * A list of `Permission` objects that represent the available permissions in the system.
   * This could be used for things like assigning permissions or managing roles.
   */
  permissions: string[];
};

/**
 * The `Role` interface defines the structure for a user's role within the application.
 * It contains information about the role's identifier, name, and the set of permissions
 * associated with that role.
 */
export interface Role {
  /**
   * A unique identifier for the role.
   */
  _id: string;

  /**
   * The name of the role (e.g., "admin", "user").
   * This represents the role's title or designation in the system.
   */
  name: string;

  /**
   * A list of permissions associated with this role.
   * Each permission is represented as a string (e.g., "create", "edit", "delete").
   * This defines what actions a user with this role is allowed to perform in the system.
   */
  permissions: string[];
}

/**
 * The `Site` interface defines the structure for a site or location within the application.
 * It contains details about the site's unique identifier, name, location, and current status.
 */
export interface Site {
  /**
   * A unique identifier for the site.
   */
  _id: string;

  /**
   * The name of the site (e.g., "New York Office", "Main Site").
   * This represents the site or location's title.
   */
  name: string;

  /**
   * The physical or geographical location of the site (e.g., "New York", "Los Angeles").
   * This provides the address or region where the site is located.
   */
  location: string;

  /**
   * The current status of the site, indicating whether it is active or inactive.
   * `active` means the site is currently operational, while `inactive` means it is not.
   */
  status: "active" | "inactive";
}
