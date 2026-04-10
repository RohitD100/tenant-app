import API from "./axios";

/**
 * Fetches a list of users with pagination and search functionality.
 * This function sends a GET request to the '/users' endpoint with query parameters for pagination and search.
 * @param {number} page - The current page number (starting from 0).
 * @param {number} rowsPerPage - The number of users to fetch per page.
 * @param {string} search - The search query to filter users by name or other attributes.
 * @returns {Promise<any>} The list of users that match the search and pagination criteria.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const getUsers = async (
  page: number,
  rowsPerPage: number,
  search: string,
) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page + 1, // Increment page by 1 to match the API's expected page numbering (usually starting at 1).
      limit: rowsPerPage, // Number of rows to fetch per page.
      search, // Search term to filter the users.
    },
  });

  return res.data; // Returns the list of users or related data.
};
