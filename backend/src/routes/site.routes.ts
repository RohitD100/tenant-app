import { Router } from "express";
import * as siteController from "../controllers/site.controller";
import auth from "../middleware/auth";
import { authorize } from "../middleware/permission";
import { validate } from "../middleware/validate";
import {
  createSiteSchema,
  updateSiteSchema,
} from "../validators/site.validator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sites
 *   description: Site management APIs
 */

router.use(auth);

/**
 * @swagger
 * /sites:
 *   post:
 *     summary: Create a new site
 *     tags: [Sites]
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
 *               - location
 *               - timezone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Head Office
 *               location:
 *                 type: string
 *                 example: New York, USA
 *               timezone:
 *                 type: string
 *                 example: America/New_York
 *               status:
 *                 type: string
 *                 enum:
 *                   - ACTIVE
 *                   - INACTIVE
 *                 example: ACTIVE
 *     responses:
 *       201:
 *         description: Site created successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks CREATE_SITE permission.
 */
router.post(
  "/",
  authorize("CREATE_SITE"),
  validate(createSiteSchema),
  siteController.createSite,
);

/**
 * @swagger
 * /sites:
 *   get:
 *     summary: Get all sites
 *     tags: [Sites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sites.
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
 *                     example: Head Office
 *                   location:
 *                     type: string
 *                     example: New York, USA
 *                   timezone:
 *                     type: string
 *                     example: America/New_York
 *                   status:
 *                     type: string
 *                     example: ACTIVE
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks READ_SITE permission.
 */
router.get("/", authorize("READ_SITE"), siteController.getSites);

/**
 * @swagger
 * /sites/{id}:
 *   put:
 *     summary: Update an existing site
 *     tags: [Sites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Site ID
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
 *                 example: Branch Office
 *               location:
 *                 type: string
 *                 example: Chicago, USA
 *               timezone:
 *                 type: string
 *                 example: America/Chicago
 *               status:
 *                 type: string
 *                 enum:
 *                   - ACTIVE
 *                   - INACTIVE
 *                 example: ACTIVE
 *     responses:
 *       200:
 *         description: Site updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks UPDATE_SITE permission.
 *       404:
 *         description: Site not found.
 */
router.put(
  "/:id",
  authorize("UPDATE_SITE"),
  validate(updateSiteSchema),
  siteController.updateSite,
);

/**
 * @swagger
 * /sites/{id}:
 *   delete:
 *     summary: Delete a site
 *     tags: [Sites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Site ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Site deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. User lacks DELETE_SITE permission.
 *       404:
 *         description: Site not found.
 */
router.delete(
  "/:id",
  authorize("DELETE_SITE"),
  siteController.deleteSite,
);

export default router;