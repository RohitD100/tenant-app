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

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management APIs
 */

router.use(auth);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
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
 *               - permissions
 *             properties:
 *               name:
 *                 type: string
 *                 example: Manager
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - CREATE_USER
 *                   - READ_USER
 *                   - UPDATE_USER
 *     responses:
 *       201:
 *         description: Role created successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks CREATE_ROLE permission.
 */
router.post(
  "/",
  authorize(PERMISSIONS.CREATE_ROLE),
  validate(createRoleSchema),
  roleController.createRole,
);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles.
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
 *                     example: Admin
 *                   permissions:
 *                     type: array
 *                     items:
 *                       type: string
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks READ_ROLE permission.
 */
router.get("/", authorize(PERMISSIONS.READ_ROLE), roleController.getRoles);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update an existing role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID
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
 *                 example: Super Admin
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - CREATE_USER
 *                   - DELETE_USER
 *                   - UPDATE_ROLE
 *     responses:
 *       200:
 *         description: Role updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks UPDATE_ROLE permission.
 *       404:
 *         description: Role not found.
 */
router.put(
  "/:id",
  authorize(PERMISSIONS.UPDATE_ROLE),
  validate(updateRoleSchema),
  roleController.updateRole,
);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Role deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks DELETE_ROLE permission.
 *       404:
 *         description: Role not found.
 */
router.delete(
  "/:id",
  authorize(PERMISSIONS.DELETE_ROLE),
  roleController.deleteRole,
);

export default router;