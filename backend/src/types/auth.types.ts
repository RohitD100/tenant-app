/**
 * Represents the input data for user signup.
 */
export interface SignupInput {
  /** The user's full name */
  name: string;

  /** The user's email address */
  email: string;

  /** The user's password */
  password: string;
}

/**
 * Represents the input data for user login.
 */
export interface LoginInput {
  /** The user's email address */
  email: string;

  /** The user's password */
  password: string;
}
