import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller";
import auth from "../middleware/auth";

/**
 * Dashboard routes that handle the retrieval of dashboard statistics.
 *
 * @module dashboardRoutes
 */

/**
 * The router that handles all dashboard-related routes.
 *
 * @type {Router}
 */
const router = Router();

/**
 * Route to get the dashboard statistics.
 * This route is protected by authentication middleware, and only authorized users can access it.
 *
 * @route GET /dashboard
 * @group Dashboard - Dashboard related routes
 * @param {object} req - The request object (user data is added by the `auth` middleware).
 * @param {object} res - The response object used to send back the dashboard stats.
 * @returns {object} 200 - The dashboard statistics data.
 * @returns {object} 401 - Unauthorized access if the user is not authenticated.
 */
router.get("/", auth, getDashboard);

export default router;
