import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { IdParams } from "../types/common";
import mongoose from "mongoose";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const { page, limit, search } = req.query;

  const users = await userService.getUsers({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    search: search || "",
  });

  res.json(users);
};

export const updateUser = async (req: Request<IdParams>, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
};

export const deactivateUser = async (req: Request<IdParams>, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  await userService.deactivateUser(req.params.id);
  res.json({ message: "User deactivated" });
};
