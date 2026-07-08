import redisClient from "../config/redis";
import Site from "../models/Site";

const SITES_CACHE_KEY = "sites:all";
const DASHBOARD_STATS_KEY = "dashboard:stats";
const SITES_CACHE_TTL = 60 * 60; // 1 hour

/**
 * Creates a new site in the system.
 *
 * @param {Object} data - Site data
 * @param {string} data.name - Name of the site
 * @param {string} data.location - Location of the site
 * @param {string} data.status - Status of the site (e.g., active, inactive)
 * @param {string} data.timezone - Timezone of the site (e.g., UTC)
 *
 * @returns {Promise<any>} The created site document
 */
export const createSite = async (data: {
  name: string;
  location: string;
  status: string;
  timezone: string;
}) => {
  const site = await Site.create(data);

  // Invalidate caches
  await Promise.all([
    redisClient.del(SITES_CACHE_KEY),
    redisClient.del(DASHBOARD_STATS_KEY),
  ]);

  return site;
};

/**
 * Retrieves all sites from the database.
 *
 * Results are cached in Redis.
 *
 * @returns {Promise<any[]>} List of sites
 */
export const getSites = async () => {
  const cachedSites = await redisClient.get(SITES_CACHE_KEY);

  if (cachedSites) {
    return JSON.parse(cachedSites);
  }

  const sites = await Site.find();

  await redisClient.setEx(
    SITES_CACHE_KEY,
    SITES_CACHE_TTL,
    JSON.stringify(sites)
  );

  return sites;
};

/**
 * Updates an existing site by ID.
 *
 * Only provided fields will be updated.
 *
 * @param {string} id - Site ID
 * @param {Object} data - Update data
 *
 * @returns {Promise<any | null>} Updated site document or null if not found
 */
export const updateSite = async (
  id: string,
  data: Partial<{
    name: string;
    location: string;
    status: string;
    timezone: string;
  }>
) => {
  const updatedSite = await Site.findByIdAndUpdate(id, data, {
    new: true,
  });

  // Invalidate caches
  await Promise.all([
    redisClient.del(SITES_CACHE_KEY),
    redisClient.del(DASHBOARD_STATS_KEY),
  ]);

  return updatedSite;
};

/**
 * Deletes a site by ID.
 *
 * @param {string} id - Site ID
 *
 * @returns {Promise<any>} Deleted site document
 */
export const deleteSite = async (id: string) => {
  const deletedSite = await Site.findByIdAndDelete(id);

  // Invalidate caches
  await Promise.all([
    redisClient.del(SITES_CACHE_KEY),
    redisClient.del(DASHBOARD_STATS_KEY),
  ]);

  return deletedSite;
};