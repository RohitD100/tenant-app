import User from "../models/User";
import Role from "../models/Role";
import Site from "../models/Site";

/**
 * Fetches dashboard statistics for admin overview.
 *
 * This includes:
 * - Total number of users
 * - Number of active users
 * - Total number of roles
 * - Total number of sites
 *
 * Uses parallel database queries for performance optimization.
 *
 * @returns {Promise<{
 *  totalUsers: number;
 *  activeUsers: number;
 *  totalRoles: number;
 *  totalSites: number;
 * }>} Dashboard statistics object
 */
export const getDashboardStats = async () => {
  const [totalUsers, activeUsers, totalRoles, totalSites] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ status: "active" }),
    Role.countDocuments(),
    Site.countDocuments(),
  ]);

  return {
    totalUsers,
    activeUsers,
    totalRoles,
    totalSites,
  };
};
