import User from "../models/User";
import Role from "../models/Role";
import Site from "../models/Site";

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

export const updateUser = async (id: string, data: any) => {
  return User.findByIdAndUpdate(id, data, { new: true })
    .populate("role")
    .populate("site");
};

export const deactivateUser = async (id: string) => {
  return User.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
};
