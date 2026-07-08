import User from "../models/User";
import Role from "../models/Role";
import Site from "../models/Site";
import redisClient from "../config/redis";

const DASHBOARD_STATS_KEY = "dashboard:stats";
const DASHBOARD_STATS_TTL = 60 * 5; // 5 minutes

/**
 * Fetches dashboard statistics for admin overview.
 *
 * This includes:
 * - Total number of users
 * - Number of active users
 * - Total number of roles
 * - Total number of sites
 *
 * Results are cached in Redis for improved performance.
 *
 * @returns {Promise<{
 *  totalUsers: number;
 *  activeUsers: number;
 *  totalRoles: number;
 *  totalSites: number;
 * }>} Dashboard statistics object
 */
export const getDashboardStats = async () => {
  // Check Redis cache first
  const cachedStats = await redisClient.get(DASHBOARD_STATS_KEY);

  if (cachedStats) {
    return JSON.parse(cachedStats);
  }

  // Fetch from MongoDB
  const [totalUsers, activeUsers, totalRoles, totalSites] =
    await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: "active" }),
      Role.countDocuments(),
      Site.countDocuments(),
    ]);

  const stats = {
    totalUsers,
    activeUsers,
    totalRoles,
    totalSites,
  };

  // Cache the result
  await redisClient.setEx(
    DASHBOARD_STATS_KEY,
    DASHBOARD_STATS_TTL,
    JSON.stringify(stats)
  );

  return stats;
};