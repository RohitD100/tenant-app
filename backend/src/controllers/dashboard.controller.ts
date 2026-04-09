import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

export const getDashboard = async (_: Request, res: Response) => {
  const stats = await dashboardService.getDashboardStats();
  res.json(stats);
};
