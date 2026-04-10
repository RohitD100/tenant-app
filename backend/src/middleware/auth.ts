import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express";

/**
 * Middleware function that checks if the request contains a valid JWT token in the `Authorization` header.
 * If the token is valid, it decodes the token and attaches the decoded user information to the request object.
 * If the token is invalid or missing, it returns a 401 Unauthorized response.
 *
 * @param req The HTTP request object, extended to include user information when authenticated.
 * @param res The HTTP response object used to send the response.
 * @param next The next middleware function to call if authentication is successful.
 *
 * @returns A JSON response indicating if the user is unauthorized or if the token is invalid.
 */
const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Decode the token using the JWT secret and attach user data to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role?: string;
    };

    // Attach the decoded user to the request object
    req.user = decoded;

    next();
  } catch {
    // Return a 401 Unauthorized error if the token is invalid
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
