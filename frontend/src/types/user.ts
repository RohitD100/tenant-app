/**
 * Represents a user in the system.
 *
 * @interface IUser
 */
export interface IUser {
  /**
   * The unique identifier for the user.
   *
   * @type {string}
   */
  _id: string;

  /**
   * The full name of the user.
   *
   * @type {string}
   */
  name: string;

  /**
   * The email address associated with the user.
   *
   * @type {string}
   */
  email: string;

  /**
   * The role assigned to the user, if any. This is an optional property.
   * The role has an _id and a name.
   *
   * @type {{ _id: string; name: string } | undefined}
   */
  role?: { _id: string; name: string };

  /**
   * The site associated with the user, if any. This is an optional property.
   * The site has an _id and a name.
   *
   * @type {{ _id: string; name: string } | undefined}
   */
  site?: { _id: string; name: string };

  /**
   * The current status of the user. It can either be 'active' or 'inactive'.
   *
   * @type {"active" | "inactive"}
   */
  status: "active" | "inactive";

  /**
   * The password for the user account, if any. This is an optional property.
   *
   * @type {string | undefined}
   */
  password?: string;
}
