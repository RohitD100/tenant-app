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
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

router.use(auth);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password@123
 *               roleId:
 *                 type: integer
 *                 example: 2
 *               siteId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks CREATE_USER permission.
 */
router.post(
  "/",
  authorize("CREATE_USER"),
  validate(createUserSchema),
  userController.createUser,
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search users by name or email
 *     responses:
 *       200:
 *         description: List of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john@example.com
 *                   role:
 *                     type: string
 *                     example: Admin
 *                   site:
 *                     type: string
 *                     example: Head Office
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks READ_USER permission.
 */
router.get(
  "/",
  authorize("READ_USER"),
  userController.getUsers,
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks READ_USER permission.
 *       404:
 *         description: User not found.
 */
router.get(
  "/:id",
  authorize("READ_USER"),
  userController.getUserById,
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               roleId:
 *                 type: integer
 *                 example: 2
 *               siteId:
 *                 type: integer
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks UPDATE_USER permission.
 *       404:
 *         description: User not found.
 */
router.put(
  "/:id",
  authorize("UPDATE_USER"),
  validate(updateUserSchema),
  userController.updateUser,
);

/**
 * @swagger
 * /users/{id}/deactivate:
 *   patch:
 *     summary: Deactivate a user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User deactivated successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks UPDATE_USER permission.
 *       404:
 *         description: User not found.
 */
router.patch(
  "/:id/deactivate",
  authorize("UPDATE_USER"),
  userController.deactivateUser,
);

export default router;