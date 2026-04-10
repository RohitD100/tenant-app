import type { IUser } from "../pages/UsersManagement";
import API from "./axios";

/**
 * Creates a new user with the provided data.
 * This function sends a POST request to the '/users' endpoint to create a new user.
 * @param {Partial<IUser> | null} data - The user data to create. Can be partial or null.
 * @returns {Promise<any>} The created user data.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const createUser = async (data: Partial<IUser> | null) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.post("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 * Updates an existing user with the provided data.
 * This function sends a PUT request to the '/users/{userId}' endpoint to update a user.
 * @param {Partial<IUser>} data - The user data to update.
 * @returns {Promise<any>} The updated user data.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const updateUser = async (data: Partial<IUser>) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.put(
    `/users/${data["_id"]}`,
    { ...data, status: "active" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

/**
 * Deactivates a user by their ID.
 * This function sends a PATCH request to the '/users/{userId}/deactivate' endpoint to deactivate the user.
 * @param {string} userId - The ID of the user to deactivate.
 * @returns {Promise<any>} The result of the deactivate operation.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const deactivateUser = async (userId: string) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.patch(
    `/users/${userId}/deactivate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
