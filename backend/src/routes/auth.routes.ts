import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

/**
 * Auth routes that handle user authentication actions such as signing up and logging in.
 * 
 * @module authRoutes
 */

/**
 * The router that handles all authentication-related routes.
 * 
 * @type {Router}
 */
const router = Router();

/**
 * Route to handle user signup.
 * This route calls the `signup` controller to create a new user in the system.
 * 
 * @route POST /signup
 * @group Auth - User authentication routes
 * @param {object} req.body - The signup data (name, email, password)
 * @returns {object} 201 - Created user data
 * @returns {object} 400 - Error message if validation fails
 */
router.post("/signup", signup);

/**
 * Route to handle user login.
 * This route calls the `login` controller to authenticate an existing user.
 * 
 * @route POST /login
 * @group Auth - User authentication routes
 * @param {object} req.body - The login data (email, password)
 * @returns {object} 200 - Authenticated user data (including token)
 * @returns {object} 400 - Error message if login fails
 */
router.post("/login", login);

export default router;