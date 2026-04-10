import { Request, Response } from "express";
import * as roleService from "../services/role.service";
import { IdParams } from "../types/common";

/**
 * Handles the creation of a new role.
 * Calls the `createRole` service method and returns the created role in the response.
 *
 * @param req The HTTP request object containing the role data in the body.
 * @param res The HTTP response object used to send back the created role.
 *
 * @returns A JSON response containing the created role.
 */
export const createRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Handles the request to fetch all roles.
 * Calls the `getRoles` service method and returns the list of roles in the response.
 *
 * @param req The HTTP request object (not used in this case).
 * @param res The HTTP response object used to send back the list of roles.
 *
 * @returns A JSON response containing the list of roles.
 */
export const getRoles = async (_: Request, res: Response) => {
  const roles = await roleService.getRoles();
  res.json(roles);
};

/**
 * Handles the request to update a role.
 * Calls the `updateRole` service method with the role ID and updated data, and returns the updated role.
 *
 * @param req The HTTP request object containing the role ID in `params` and the updated data in the body.
 * @param res The HTTP response object used to send back the updated role.
 *
 * @returns A JSON response containing the updated role.
 */
export const updateRole = async (req: Request<IdParams>, res: Response) => {
  const role = await roleService.updateRole(req.params.id, req.body);
  res.json(role);
};

/**
 * Handles the request to delete a role.
 * Calls the `deleteRole` service method with the role ID and returns a success message upon deletion.
 *
 * @param req The HTTP request object containing the role ID in `params`.
 * @param res The HTTP response object used to send back the deletion confirmation.
 *
 * @returns A JSON response confirming the role deletion.
 */
export const deleteRole = async (req: Request<IdParams>, res: Response) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.json({ message: "Role deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
