import { Request, Response } from "express";
import * as siteService from "../services/site.service";
import { IdParams } from "../types/common";
import mongoose from "mongoose";

export const createSite = async (req: Request, res: Response) => {
  try {
    const site = await siteService.createSite(req.body);
    res.status(201).json(site);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getSites = async (_: Request, res: Response) => {
  const sites = await siteService.getSites();
  res.json(sites);
};

export const updateSite = async (req: Request<IdParams>, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const site = await siteService.updateSite(req.params.id, req.body);
  res.json(site);
};

export const deleteSite = async (req: Request<IdParams>, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  await siteService.deleteSite(req.params.id);
  res.json({ message: "Site deleted" });
};
