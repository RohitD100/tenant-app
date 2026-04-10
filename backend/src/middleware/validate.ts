import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware factory that validates request body using a Zod schema.
 *
 * This middleware ensures that incoming request data matches the defined schema
 * before reaching the controller. If validation fails, it returns a 400 response
 * with detailed error messages.
 *
 * @param {ZodTypeAny} schema - Zod schema used to validate the request body
 *
 * @returns Express middleware function
 *
 * @example
 * router.post("/roles", validate(createRoleSchema), roleController.createRole);
 */
export const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }
  };
