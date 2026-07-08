import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller";
import auth from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics APIs
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   example: 120
 *                 totalProducts:
 *                   type: integer
 *                   example: 45
 *                 totalOrders:
 *                   type: integer
 *                   example: 230
 *                 totalRevenue:
 *                   type: number
 *                   format: float
 *                   example: 125430.75
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.get("/", auth, getDashboard);

export default router;