import API from "./axios";

/**
 * Logs in the user with their email and password.
 * @param {Object} data - The login data.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @returns {Promise} The result of the API post request.
 */
export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

/**
 * Signs up a new user with the provided data.
 * @param {Object} data - The signup data.
 * @param {any} data - The signup data, which may include fields such as email, password, etc.
 * @returns {Promise} The result of the API post request.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signup = (data: any) => API.post("/auth/signup", data);

/**
 * Fetches the user details by user ID.
 * @param {string} userId - The ID of the user whose details are to be fetched.
 * @returns {Promise<Object>} The details of the user.
 * @throws {Error} If no access token is found in sessionStorage.
 */
export const getUserDetails = async (userId: string) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
