import { Request } from "express";

/**
 * Represents an authenticated request in the Express framework.
 * Extends the default Express `Request` object by adding an optional `user` object.
 *
 * @extends Request The base Express Request object.
 */
export interface AuthRequest extends Request {
  /** The authenticated user, if available */
  user?: {
    /** The unique identifier of the authenticated user */
    id: string;

    /** The role of the authenticated user (optional) */
    role?: string;
  };
}
