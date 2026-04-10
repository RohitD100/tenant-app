import Role from "../models/Role";
import User from "../models/User";

/**
 * Creates a new role in the system.
 *
 * Checks if a role with the same name already exists before creation.
 *
 * @param {Object} data - Role data
 * @param {string} data.name - Name of the role
 * @param {string[]} data.permissions - List of permissions assigned to the role
 *
 * @returns {Promise<any>} The created role document
 *
 * @throws {Error} If a role with the same name already exists
 */
export const createRole = async (data: {
  name: string;
  permissions: string[];
}) => {
  const existing = await Role.findOne({ name: data.name });
  if (existing) throw new Error("Role already exists");

  return Role.create(data);
};

/**
 * Retrieves all roles from the database.
 *
 * @returns {Promise<any[]>} List of roles
 */
export const getRoles = async () => {
  return Role.find();
};

/**
 * Updates an existing role by ID.
 *
 * Only provided fields will be updated.
 *
 * @param {string} id - Role ID
 * @param {Object} data - Update data
 * @param {string} [data.name] - Updated role name (optional)
 * @param {string[]} [data.permissions] - Updated permissions list (optional)
 *
 * @returns {Promise<any | null>} Updated role document or null if not found
 */
export const updateRole = async (
  id: string,
  data: { name?: string; permissions?: string[] },
) => {
  return Role.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Deletes a role by ID.
 *
 * Prevents deletion if any users are currently assigned to this role.
 *
 * @param {string} id - Role ID
 *
 * @returns {Promise<any>} Deleted role document
 *
 * @throws {Error} If the role is assigned to one or more users
 */
export const deleteRole = async (id: string) => {
  // 🔥 IMPORTANT EDGE CASE
  const users = await User.find({ role: id });

  if (users.length > 0) {
    throw new Error("Cannot delete role assigned to users");
  }

  return Role.findByIdAndDelete(id);
};
