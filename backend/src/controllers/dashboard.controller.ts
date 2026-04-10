import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

/**
 * Handles the request to fetch the dashboard statistics.
 * Calls the `getDashboardStats` service method and returns the stats in the response.
 *
 * @param req The HTTP request object (not used in this case).
 * @param res The HTTP response object used to send back the stats data.
 *
 * @returns A JSON response containing the dashboard statistics.
 */
export const getDashboard = async (_: Request, res: Response) => {
  // Fetch the dashboard statistics from the service
  const stats = await dashboardService.getDashboardStats();

  // Send the stats as a JSON response
  res.json(stats);
};
