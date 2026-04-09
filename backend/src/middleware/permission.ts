import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/express.js";
import User from "../models/User.js";

export const authorize = (requiredPermission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id).populate("role");

    const permissions = (user?.role as any)?.permissions || [];

    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
