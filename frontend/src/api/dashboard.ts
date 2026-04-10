import API from "./axios";

/**
 * Fetches the dashboard data.
 * This function sends a GET request to the '/dashboard' endpoint with an Authorization token.
 * The token is retrieved from the session storage.
 * @returns {Promise} The data from the dashboard API response.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const getDashboard = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
