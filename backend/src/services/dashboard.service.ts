import User from "../models/User";
import Role from "../models/Role";
import Site from "../models/Site";

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
