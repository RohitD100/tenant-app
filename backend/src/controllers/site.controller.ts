import { Request, Response } from "express";
import * as siteService from "../services/site.service";
import { IdParams } from "../types/common";
import mongoose from "mongoose";

/**
 * Handles the creation of a new site.
 * Calls the `createSite` service method and returns the created site in the response.
 *
 * @param req The HTTP request object containing the site data in the body.
 * @param res The HTTP response object used to send back the created site.
 *
 * @returns A JSON response containing the created site.
 */
export const createSite = async (req: Request, res: Response) => {
  try {
    const site = await siteService.createSite(req.body);
    res.status(201).json(site);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Handles the request to fetch all sites.
 * Calls the `getSites` service method and returns the list of sites in the response.
 *
 * @param req The HTTP request object (not used in this case).
 * @param res The HTTP response object used to send back the list of sites.
 *
 * @returns A JSON response containing the list of sites.
 */
export const getSites = async (_: Request, res: Response) => {
  const sites = await siteService.getSites();
  res.json(sites);
};

/**
 * Handles the request to update a site by its ID.
 * Validates the site ID and calls the `updateSite` service method to update the site.
 * If successful, returns the updated site. Otherwise, returns an error message.
 *
 * @param req The HTTP request object containing the site ID in `params` and the updated data in the body.
 * @param res The HTTP response object used to send back the updated site or an error message.
 *
 * @returns A JSON response containing the updated site or an error message.
 */
export const updateSite = async (req: Request<IdParams>, res: Response) => {
  // Validate the site ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const site = await siteService.updateSite(req.params.id, req.body);

    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }

    res.status(200).json({
      message: "Site updated successfully",
      site,
    });
  } catch (error) {
    console.error("Error updating site:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Handles the request to delete a site by its ID.
 * Validates the site ID and calls the `deleteSite` service method to delete the site.
 *
 * @param req The HTTP request object containing the site ID in `params`.
 * @param res The HTTP response object used to send back the deletion confirmation.
 *
 * @returns A JSON response confirming the site deletion.
 */
export const deleteSite = async (req: Request<IdParams>, res: Response) => {
  // Validate the site ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  await siteService.deleteSite(req.params.id);
  res.json({ message: "Site deleted" });
};
