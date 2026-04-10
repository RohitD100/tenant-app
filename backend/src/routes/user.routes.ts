import { Router } from "express";
import * as userController from "../controllers/user.controller";
import auth from "../middleware/auth";
import { authorize } from "../middleware/permission";

/**
 * User management routes for handling CRUD operations on users.
 * These routes are protected by authentication and permission-based authorization.
 * 
 * @module userRoutes
 */

const router = Router();

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
router.post("/", authorize("CREATE_USER"), userController.createUser);

/**
 * Route to retrieve a list of users with optional pagination and search.
 * Requires "READ_USER" permission.
 * 
 * @route GET /users
 */
router.get("/", authorize("READ_USER"), userController.getUsers);

/**
 * Route to update a user by ID.
 * Requires "UPDATE_USER" permission.
 * 
 * @route PUT /users/:id
 */
router.put("/:id", authorize("UPDATE_USER"), userController.updateUser);

/**
 * Route to deactivate a user account by ID.
 * Requires "UPDATE_USER" permission.
 * 
 * @route PATCH /users/:id/deactivate
 */
router.patch(
  "/:id/deactivate",
  authorize("UPDATE_USER"),
  userController.deactivateUser,
);

/**
 * Route to get a single user by ID.
 * Requires "READ_USER" permission.
 * 
 * @route GET /users/:id
 */
router.get("/:id", authorize("READ_USER"), userController.getUserById);

export default router;