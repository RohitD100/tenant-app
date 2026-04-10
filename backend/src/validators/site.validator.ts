import { z } from "zod";

/**
 * Validation schema for creating a new site.
 *
 * Ensures that all required fields (name, location, status, timezone) are provided
 * and that the status is either "active" or "inactive", and timezone is a valid string.
 */
export const createSiteSchema = z.object({
  /** The name of the site (e.g., "New York Office", "London Warehouse") */
  name: z.string().min(3, "Site name must be at least 3 characters long"),

  /** The location of the site (e.g., city, country) */
  location: z.string().min(3, "Location must be at least 3 characters long"),

  /** The current status of the site: "active" or "inactive" */
  status: z.enum(["active", "inactive"]).default("active"),

  /** The timezone of the site (e.g., "UTC", "PST", "EST") */
  timezone: z.string().min(1, "Timezone must be a non-empty string").default("UTC"),
});

/**
 * Validation schema for updating an existing site.
 *
 * All fields are optional, so users can update one or more properties of the site.
 * If provided, the fields will be validated based on the rules above.
 */
export const updateSiteSchema = z.object({
  /** The name of the site (optional, must be at least 3 characters long if provided) */
  name: z.string().min(3, "Site name must be at least 3 characters long").optional(),

  /** The location of the site (optional, must be at least 3 characters long if provided) */
  location: z.string().min(3, "Location must be at least 3 characters long").optional(),

  /** The current status of the site: "active" or "inactive" (optional) */
  status: z.enum(["active", "inactive"]).optional(),

  /** The timezone of the site (optional, must be a non-empty string if provided) */
  timezone: z.string().min(1, "Timezone must be a non-empty string").optional(),
});