import { Router } from "express";
import * as roleController from "../controllers/role.controller";
import auth from "../middleware/auth";
import { authorize } from "../middleware/permission";
import { PERMISSIONS } from "../constants/permissions";
import { validate } from "../middleware/validate";
import {
  createRoleSchema,
  updateRoleSchema,
} from "../validators/role.validator";

/**
 * Role management routes for handling CRUD operations on user roles.
 *
 * All routes are protected by authentication and fine-grained permission-based authorization.
 *
 * @module roleRoutes
 */

/**
 * Router instance for role-related endpoints.
 *
 * @type {Router}
 */
const router = Router();

/**
 * Protect all role routes with authentication middleware.
 * Ensures only logged-in users can access role management APIs.
 */
router.use(auth);

/**
 * Create a new role.
 *
 * Requires permission: `CREATE_ROLE`
 *
 * @route POST /roles
 */
router.post(
  "/",
  authorize(PERMISSIONS.CREATE_ROLE), // Ensure the user has permission to create a role
  validate(createRoleSchema), // Validate the request body using the createRoleSchema
  roleController.createRole, // Call the controller to handle role creation
);

/**
 * Get all roles.
 *
 * Requires permission: `READ_ROLE`
 *
 * @route GET /roles
 */
router.get("/", authorize(PERMISSIONS.READ_ROLE), roleController.getRoles);

/**
 * Update an existing role by ID.
 *
 * Requires permission: `UPDATE_ROLE`
 *
 * @route PUT /roles/{id}
 */
router.put(
  "/:id",
  authorize(PERMISSIONS.UPDATE_ROLE), // Ensure the user has permission to update a role
  validate(updateRoleSchema), // Validate the request body using the updateRoleSchema
  roleController.updateRole, // Call the controller to handle role update
);

/**
 * Delete a role by ID.
 *
 * Requires permission: `DELETE_ROLE`
 *
 * @route DELETE /roles/{id}
 */
router.delete(
  "/:id",
  authorize(PERMISSIONS.DELETE_ROLE),
  roleController.deleteRole,
);

export default router;
