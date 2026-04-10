import { Request, Response } from "express";
import * as authService from "../services/auth.service";

/**
 * Handles user signup by calling the `signup` service method.
 * If successful, responds with a 201 status code and the created data.
 * If there is an error, responds with a 400 status code and the error message.
 *
 * @param req The HTTP request object containing user data in the body.
 * @param res The HTTP response object used to send back the result.
 *
 * @returns A JSON response with the result of the signup operation.
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const data = await authService.signup(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Handles user login by calling the `login` service method.
 * If successful, responds with the login data (e.g., token or user info).
 * If there is an error, responds with a 400 status code and the error message.
 *
 * @param req The HTTP request object containing login credentials in the body.
 * @param res The HTTP response object used to send back the result.
 *
 * @returns A JSON response with the result of the login operation.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const data = await authService.login(req.body);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
