import { Router } from "express";
import * as roleController from "../controllers/role.controller";
import auth from "../middleware/auth";

/**
 * Role management routes for handling CRUD operations on user roles.
 *
 * @module roleRoutes
 */

/**
 * The router that handles all role-related routes, protected by authentication middleware.
 *
 * @type {Router}
 */
const router = Router();

/**
 * Middleware that protects all role routes, ensuring that only authenticated users can access them.
 */
router.use(auth); // Protect all routes

/**
 * Route to create a new role.
 * This route is protected by authentication middleware.
 *
 * @route POST /roles
 * @group Roles - Role management routes
 * @param {object} req.body - The data required to create a role (e.g., name, permissions).
 * @returns {object} 201 - The created role.
 * @returns {object} 400 - Error message if role creation fails.
 */
router.post("/", roleController.createRole);

/**
 * Route to get all roles.
 * This route is protected by authentication middleware.
 *
 * @route GET /roles
 * @group Roles - Role management routes
 * @returns {array} 200 - List of all roles.
 * @returns {object} 401 - Unauthorized access if the user is not authenticated.
 */
router.get("/", roleController.getRoles);

/**
 * Route to update an existing role by ID.
 * This route is protected by authentication middleware.
 *
 * @route PUT /roles/{id}
 * @group Roles - Role management routes
 * @param {string} id.path.required - The ID of the role to update.
 * @param {object} req.body - The updated role data (e.g., name, permissions).
 * @returns {object} 200 - The updated role.
 * @returns {object} 400 - Error message if role update fails.
 * @returns {object} 404 - Role not found if the provided ID does not exist.
 */
router.put("/:id", roleController.updateRole);

/**
 * Route to delete a role by ID.
 * This route is protected by authentication middleware.
 *
 * @route DELETE /roles/{id}
 * @group Roles - Role management routes
 * @param {string} id.path.required - The ID of the role to delete.
 * @returns {object} 200 - Message confirming the role deletion.
 * @returns {object} 400 - Error message if role deletion fails.
 * @returns {object} 404 - Role not found if the provided ID does not exist.
 */
router.delete("/:id", roleController.deleteRole);

export default router;
