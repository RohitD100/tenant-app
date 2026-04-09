import { Request, Response } from "express";
import * as roleService from "../services/role.service";

type Params = {
  id: string;
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getRoles = async (_: Request, res: Response) => {
  const roles = await roleService.getRoles();
  res.json(roles);
};

export const updateRole = async (req: Request<Params>, res: Response) => {
  const role = await roleService.updateRole(req.params.id, req.body);
  res.json(role);
};

export const deleteRole = async (req: Request<Params>, res: Response) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.json({ message: "Role deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
