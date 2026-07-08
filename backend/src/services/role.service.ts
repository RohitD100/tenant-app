import redisClient from "../config/redis";
import Role from "../models/Role";
import User from "../models/User";

const ROLES_CACHE_KEY = "roles:all";
const DASHBOARD_STATS_KEY = "dashboard:stats";
const ROLES_CACHE_TTL = 60 * 60; // 1 hour

/**
 * Creates a new role in the system.
 *
 * Checks if a role with the same name already exists before creation.
 */
export const createRole = async (data: {
  name: string;
  permissions: string[];
}) => {
  const existing = await Role.findOne({ name: data.name });

  if (existing) {
    throw new Error("Role already exists");
  }

  const role = await Role.create(data);

  // Invalidate caches
  await Promise.all([
    redisClient.del(ROLES_CACHE_KEY),
    redisClient.del(DASHBOARD_STATS_KEY),
  ]);

  return role;
};

/**
 * Retrieves all roles from the database.
 *
 * Results are cached in Redis.
 */
export const getRoles = async () => {
  const cachedRoles = await redisClient.get(ROLES_CACHE_KEY);

  if (cachedRoles) {
    return JSON.parse(cachedRoles);
  }

  const roles = await Role.find();

  await redisClient.setEx(
    ROLES_CACHE_KEY,
    ROLES_CACHE_TTL,
    JSON.stringify(roles)
  );

  return roles;
};

/**
 * Updates an existing role by ID.
 *
 * Only provided fields will be updated.
 */
export const updateRole = async (
  id: string,
  data: { name?: string; permissions?: string[] }
) => {
  const updatedRole = await Role.findByIdAndUpdate(id, data, {
    new: true,
  });

  // Invalidate cache
  await Promise.all([
    redisClient.del(ROLES_CACHE_KEY),
    redisClient.del(DASHBOARD_STATS_KEY),
  ]);

  return updatedRole;
};

/**
 * Deletes a role by ID.
 *
 * Prevents deletion if any users are currently assigned to this role.
 */
export const deleteRole = async (id: string) => {
  const users = await User.find({ role: id });

  if (users.length > 0) {
    throw new Error("Cannot delete role assigned to users");
  }

  const deletedRole = await Role.findByIdAndDelete(id);

  // Invalidate cache
  await Promise.all([
    redisClient.del(ROLES_CACHE_KEY),
    redisClient.del(DASHBOARD_STATS_KEY),
  ]);

  return deletedRole;
};