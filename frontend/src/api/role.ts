import API from "./axios";

/**
 * Fetches the list of roles.
 * This function sends a GET request to the '/roles' endpoint with an Authorization token.
 * The token is retrieved from the session storage.
 * @returns {} The list of roles.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const getRoles = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.get(`/roles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 * Creates a new role with the specified name and permissions.
 * This function sends a POST request to the '/roles' endpoint to create a role.
 * @param {string} name - The name of the new role.
 * @param {string[]} permissions - The list of permissions for the new role.
 * @returns {} The created role data.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const createRole = async (name: string, permissions: string[]) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.post(
    `/roles`,
    { name, permissions },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

/**
 * Updates an existing role with the specified name, permissions, and roleId.
 * This function sends a PUT request to the '/roles/{roleId}' endpoint to update a role.
 * @param {string} name - The name of the role.
 * @param {string[]} permissions - The list of permissions for the role.
 * @param {string} roleId - The ID of the role to update.
 * @returns {} The updated role data.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const updateRole = async (
  name: string,
  permissions: string[],
  roleId: string,
) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.put(
    `/roles/${roleId}`,
    { name, permissions },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

/**
 * Deletes a role by its ID.
 * This function sends a DELETE request to the '/roles/{roleId}' endpoint to delete a role.
 * @param {string} roleId - The ID of the role to delete.
 * @returns {} The result of the delete operation.
 * @throws {Error} If the token is not found in sessionStorage.
 */
export const deleteRole = async (roleId: string) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.delete(`/roles/${roleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
