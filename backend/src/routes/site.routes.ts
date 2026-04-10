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
 * Site management routes for handling CRUD operations on sites.
 * These routes are protected by authentication and authorization middleware.
 *
 * @module siteRoutes
 */

/**
 * Middleware that protects all site-related routes, ensuring that only authenticated users can access them.
 */
router.use(auth);

/**
 * Route to create a new site.
 * This route is protected by both authentication and authorization middleware.
 * Only users with the "CREATE_SITE" permission can access this route.
 *
 * @route POST /sites
 * @group Sites - Site management routes
 * @param {object} req.body - The data required to create a site (e.g., name, location, status, timezone).
 * @returns {object} 201 - The created site.
 * @returns {object} 400 - Error message if site creation fails.
 * @returns {object} 403 - Forbidden if the user does not have the "CREATE_SITE" permission.
 */
router.post(
  "/",
  authorize("CREATE_SITE"), // Ensure user has the CREATE_SITE permission
  validate(createSiteSchema), // Validate the request body with createSiteSchema
  siteController.createSite, // Handle site creation
);

/**
 * Route to get all sites.
 * This route is protected by both authentication and authorization middleware.
 * Only users with the "READ_SITE" permission can access this route.
 *
 * @route GET /sites
 * @group Sites - Site management routes
 * @returns {array} 200 - List of all sites.
 * @returns {object} 401 - Unauthorized if the user is not authenticated.
 * @returns {object} 403 - Forbidden if the user does not have the "READ_SITE" permission.
 */
router.get(
  "/",
  authorize("READ_SITE"), // Ensure user has the READ_SITE permission
  siteController.getSites, // Handle site fetching
);

/**
 * Route to update an existing site by ID.
 * This route is protected by both authentication and authorization middleware.
 * Only users with the "UPDATE_SITE" permission can access this route.
 *
 * @route PUT /sites/{id}
 * @group Sites - Site management routes
 * @param {string} id.path.required - The ID of the site to update.
 * @param {object} req.body - The updated site data (e.g., name, location, status, timezone).
 * @returns {object} 200 - The updated site.
 * @returns {object} 400 - Error message if site update fails.
 * @returns {object} 403 - Forbidden if the user does not have the "UPDATE_SITE" permission.
 * @returns {object} 404 - Site not found if the provided ID does not exist.
 */
router.put(
  "/:id",
  authorize("UPDATE_SITE"), // Ensure user has the UPDATE_SITE permission
  validate(updateSiteSchema), // Validate the request body with updateSiteSchema
  siteController.updateSite, // Handle site update
);

/**
 * Route to delete a site by ID.
 * This route is protected by both authentication and authorization middleware.
 * Only users with the "DELETE_SITE" permission can access this route.
 *
 * @route DELETE /sites/{id}
 * @group Sites - Site management routes
 * @param {string} id.path.required - The ID of the site to delete.
 * @returns {object} 200 - Message confirming the site deletion.
 * @returns {object} 400 - Error message if site deletion fails.
 * @returns {object} 403 - Forbidden if the user does not have the "DELETE_SITE" permission.
 * @returns {object} 404 - Site not found if the provided ID does not exist.
 */
router.delete(
  "/:id",
  authorize("DELETE_SITE"), // Ensure user has the DELETE_SITE permission
  siteController.deleteSite, // Handle site deletion
);

export default router;
