import User from "../models/User";
import Role from "../models/Role";
import Site from "../models/Site";

/**
 * Creates a new user in the system after validating:
 * - duplicate email
 * - valid role
 * - valid site
 *
 * @param {Object} data - User data
 * @param {string} data.name - Full name
 * @param {string} data.email - Email address
 * @param {string} data.password - Plain text password (will be hashed in model)
 * @param {string} data.role - Role ID
 * @param {string} data.site - Site ID
 *
 * @returns {Promise<any>} Created user document
 *
 * @throws {Error} If email already exists, role is invalid, or site is invalid
 */
export const createUser = async (data: any) => {
  const { name, email, password, role, site } = data;

  // check duplicate
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  // validate role
  const roleExists = await Role.findById(role);
  if (!roleExists) throw new Error("Invalid role");

  // validate site
  const siteExists = await Site.findById(site);
  if (!siteExists) throw new Error("Invalid site");

  return User.create({ name, email, password, role, site });
};

/**
 * Retrieves paginated list of users with optional search.
 *
 * Search applies to:
 * - name
 * - email
 *
 * @param {Object} params - Query options
 * @param {number} [params.page=1] - Page number
 * @param {number} [params.limit=10] - Number of results per page
 * @param {string} [params.search=""] - Search keyword
 *
 * @returns {Promise<{
 *  data: any[];
 *  total: number;
 *  page: number;
 *  pages: number;
 * }>} Paginated user results
 */
export const getUsers = async ({ page = 1, limit = 10, search = "" }: any) => {
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
 *
 * @param {string} id - User ID
 * @param {Object} data - Update payload
 *
 * @returns {Promise<any>} Updated user document
 */
export const updateUser = async (id: string, data: any) => {
  return User.findByIdAndUpdate(id, data, { new: true })
    .populate("role")
    .populate("site");
};

/**
 * Deactivates a user (soft disable).
 *
 * @param {string} id - User ID
 *
 * @returns {Promise<any>} Updated user document
 */
export const deactivateUser = async (id: string) => {
  return User.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
};

/**
 * Retrieves a single user by ID.
 *
 * @param {string} id - User ID
 *
 * @returns {Promise<any>} User document
 *
 * @throws {Error} If user is not found
 */
export const getUserById = async (id: string) => {
  const user = await User.findById(id).populate("role").populate("site");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
