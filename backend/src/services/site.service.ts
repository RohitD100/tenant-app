import Site from "../models/Site";

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
  return Site.create(data);
};

/**
 * Retrieves all sites from the database.
 *
 * @returns {Promise<any[]>} List of sites
 */
export const getSites = async () => {
  return Site.find();
};

/**
 * Updates an existing site by ID.
 *
 * Only provided fields will be updated.
 *
 * @param {string} id - Site ID
 * @param {Object} data - Update data
 * @param {string} [data.name] - Updated site name (optional)
 * @param {string} [data.location] - Updated location (optional)
 * @param {string} [data.status] - Updated status (optional)
 * @param {string} [data.timezone] - Updated timezone (optional)
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
  }>,
) => {
  return Site.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Deletes a site by ID.
 *
 * @param {string} id - Site ID
 *
 * @returns {Promise<any>} Deleted site document
 */
export const deleteSite = async (id: string) => {
  return Site.findByIdAndDelete(id);
};
