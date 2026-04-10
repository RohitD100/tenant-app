import { Router } from "express";
import * as userController from "../controllers/user.controller";
import auth from "../middleware/auth";
import { authorize } from "../middleware/permission";
import { validate } from "../middleware/validate";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.validator";

const router = Router();

/**
 * User management routes for handling CRUD operations on users.
 * These routes are protected by authentication and permission-based authorization.
 *
 * @module userRoutes
 */

/**
 * Middleware that protects all user routes, ensuring only authenticated users can access them.
 */
router.use(auth);

/**
 * Route to create a new user.
 * Requires "CREATE_USER" permission.
 *
 * @route POST /users
 */
router.post(
  "/",
  authorize("CREATE_USER"), // Ensure user has the CREATE_USER permission
  validate(createUserSchema), // Validate the request body with createUserSchema
  userController.createUser, // Handle user creation
);

/**
 * Route to retrieve a list of users with optional pagination and search.
 * Requires "READ_USER" permission.
 *
 * @route GET /users
 */
router.get(
  "/",
  authorize("READ_USER"), // Ensure user has the READ_USER permission
  userController.getUsers, // Handle retrieving users
);

/**
 * Route to update a user by ID.
 * Requires "UPDATE_USER" permission.
 *
 * @route PUT /users/:id
 */
router.put(
  "/:id",
  authorize("UPDATE_USER"), // Ensure user has the UPDATE_USER permission
  validate(updateUserSchema), // Validate the request body with updateUserSchema
  userController.updateUser, // Handle user update
);

/**
 * Route to deactivate a user account by ID.
 * Requires "UPDATE_USER" permission.
 *
 * @route PATCH /users/:id/deactivate
 */
router.patch(
  "/:id/deactivate",
  authorize("UPDATE_USER"), // Ensure user has the UPDATE_USER permission
  userController.deactivateUser, // Handle deactivating the user
);

/**
 * Route to get a single user by ID.
 * Requires "READ_USER" permission.
 *
 * @route GET /users/:id
 */
router.get(
  "/:id",
  authorize("READ_USER"), // Ensure user has the READ_USER permission
  userController.getUserById, // Handle fetching a user by ID
);

export default router;
