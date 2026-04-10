import API from "./axios";

/**
 * Fetches the list of sites.
 * This function sends a GET request to the '/sites' endpoint with an Authorization token.
 * The token is retrieved from the session storage.
 * @returns {Promise<any>} The list of sites data.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const getSites = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.get(`/sites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 * Creates a new site with the provided name, location, status, and timezone.
 * This function sends a POST request to the '/sites' endpoint to create a site.
 * @param {string} name - The name of the site.
 * @param {string} location - The location of the site.
 * @param {"active" | "inactive"} status - The status of the site.
 * @param {string | undefined} timezone - The timezone of the site.
 * @returns {Promise<any>} The created site data.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const createSite = async (
  name: string,
  location: string,
  status: "active" | "inactive",
  timezone: string | undefined,
) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.post(
    `/sites`,
    { name, location, status, timezone },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

/**
 * Updates an existing site with the provided name, location, status, siteId, and timezone.
 * This function sends a PUT request to the '/sites/{siteId}' endpoint to update a site.
 * @param {string} name - The name of the site.
 * @param {string} location - The location of the site.
 * @param {"active" | "inactive"} status - The status of the site.
 * @param {string} siteId - The ID of the site to be updated.
 * @param {string | undefined} timezone - The timezone of the site.
 * @returns {Promise<any>} The updated site data.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const updateSite = async (
  name: string,
  location: string,
  status: "active" | "inactive",
  siteId: string,
  timezone: string | undefined,
) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.put(
    `/sites/${siteId}`,
    { name, location, status, timezone },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

/**
 * Deletes a site by its ID.
 * This function sends a DELETE request to the '/sites/{siteId}' endpoint to delete a site.
 * @param {string} siteId - The ID of the site to be deleted.
 * @returns {Promise<any>} The result of the delete operation.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const deleteSite = async (siteId: string) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.delete(`/sites/${siteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
