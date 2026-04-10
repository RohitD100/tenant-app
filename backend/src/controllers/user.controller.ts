import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { IdParams } from "../types/common";
import mongoose from "mongoose";

/**
 * Handles the creation of a new user.
 * Calls the `createUser` service method and returns the created user in the response.
 *
 * @param req The HTTP request object containing the user data in the body.
 * @param res The HTTP response object used to send back the created user.
 *
 * @returns A JSON response containing the created user.
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Handles the request to fetch users with optional pagination and search functionality.
 * Calls the `getUsers` service method and returns the list of users based on query parameters.
 *
 * @param req The HTTP request object containing the pagination and search query parameters.
 * @param res The HTTP response object used to send back the list of users.
 *
 * @returns A JSON response containing the list of users.
 */
export const getUsers = async (req: Request, res: Response) => {
  const { page, limit, search } = req.query;

  const users = await userService.getUsers({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    search: search || "",
  });

  res.json(users);
};

/**
 * Handles the request to update a user by their ID.
 * Validates the user ID, calls the `updateUser` service method, and returns the updated user.
 *
 * @param req The HTTP request object containing the user ID in `params` and the updated data in the body.
 * @param res The HTTP response object used to send back the updated user.
 *
 * @returns A JSON response containing the updated user.
 */
export const updateUser = async (req: Request<IdParams>, res: Response) => {
  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
};

/**
 * Handles the request to deactivate a user by their ID.
 * Validates the user ID and calls the `deactivateUser` service method to deactivate the user.
 *
 * @param req The HTTP request object containing the user ID in `params`.
 * @param res The HTTP response object used to send back the deactivation confirmation.
 *
 * @returns A JSON response confirming the user deactivation.
 */
export const deactivateUser = async (req: Request<IdParams>, res: Response) => {
  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  await userService.deactivateUser(req.params.id);
  res.json({ message: "User deactivated" });
};

/**
 * Handles the request to fetch a user by their ID.
 * Validates the user ID and calls the `getUserById` service method to retrieve the user.
 *
 * @param req The HTTP request object containing the user ID in `params`.
 * @param res The HTTP response object used to send back the user data.
 *
 * @returns A JSON response containing the user data.
 */
export const getUserById = async (req: Request<IdParams>, res: Response) => {
  try {
    // Validate the user ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const user = await userService.getUserById(req.params.id);

    res.json(user);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
