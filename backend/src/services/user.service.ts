import User from "../models/User";
import Role from "../models/Role";
import Site from "../models/Site";
import redisClient from "../config/redis";

const USER_CACHE_PREFIX = "user:";
const DASHBOARD_STATS_KEY = "dashboard:stats";
const USER_CACHE_TTL = 60 * 60; // 1 hour

/**
 * Creates a new user in the system after validating:
 * - duplicate email
 * - valid role
 * - valid site
 */
export const createUser = async (data: any) => {
  const { name, email, password, role, site } = data;

  const existing = await User.findOne({ email });

  if (existing) {
    throw new Error("Email already exists");
  }

  const roleExists = await Role.findById(role);

  if (!roleExists) {
    throw new Error("Invalid role");
  }

  const siteExists = await Site.findById(site);

  if (!siteExists) {
    throw new Error("Invalid site");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    site,
  });

  const populatedUser = await User.findById(user._id)
    .populate("role")
    .populate("site");

  await Promise.all([
    redisClient.setEx(
      `${USER_CACHE_PREFIX}${user._id}`,
      USER_CACHE_TTL,
      JSON.stringify(populatedUser)
    ),
    redisClient.del(DASHBOARD_STATS_KEY),
  ]);

  return populatedUser;
};

/**
 * Retrieves paginated list of users with optional search.
 *
 * Pagination/search results are fetched directly from MongoDB.
 */
export const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
}: any) => {
  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(query)
    .populate("role")
    .populate("site")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await User.countDocuments(query);

  return {
    data: users,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

/**
 * Updates a user by ID.
 */
export const updateUser = async (id: string, data: any) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    new: true,
  })
    .populate("role")
    .populate("site");

  if (updatedUser) {
    await redisClient.setEx(
      `${USER_CACHE_PREFIX}${id}`,
      USER_CACHE_TTL,
      JSON.stringify(updatedUser)
    );
  }

  return updatedUser;
};

/**
 * Deactivates a user (soft disable).
 */
export const deactivateUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { status: "inactive" },
    { new: true }
  )
    .populate("role")
    .populate("site");

  if (user) {
    await Promise.all([
      redisClient.setEx(
        `${USER_CACHE_PREFIX}${id}`,
        USER_CACHE_TTL,
        JSON.stringify(user)
      ),
      redisClient.del(DASHBOARD_STATS_KEY),
    ]);
  }

  return user;
};

/**
 * Retrieves a single user by ID.
 */
export const getUserById = async (id: string) => {
  const cachedUser = await redisClient.get(`${USER_CACHE_PREFIX}${id}`);

  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  const user = await User.findById(id)
    .populate("role")
    .populate("site");

  if (!user) {
    throw new Error("User not found");
  }

  await redisClient.setEx(
    `${USER_CACHE_PREFIX}${id}`,
    USER_CACHE_TTL,
    JSON.stringify(user)
  );

  return user;
};