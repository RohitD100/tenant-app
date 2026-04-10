import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/express";
import User from "../models/User";

/**
 * Middleware function that checks if the authenticated user has the required permission.
 * This function retrieves the user's role and compares the user's permissions with the required permission.
 * If the user lacks the required permission, a 403 Forbidden response is sent.
 *
 * @param requiredPermission The permission that is required for the current operation.
 * @returns A middleware function that performs the authorization check.
 */
export const authorize = (requiredPermission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Find the user by ID and populate the user's role
    const user = await User.findById(req.user?.id).populate("role");

    // Retrieve the user's permissions from their role
    const permissions = (user?.role as any)?.permissions || [];

    // Check if the user has the required permission
    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // If the user has the required permission, proceed to the next middleware
    next();
  };
};
