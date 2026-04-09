import Role from "../models/Role";
import User from "../models/User";

export const createRole = async (data: {
  name: string;
  permissions: string[];
}) => {
  const existing = await Role.findOne({ name: data.name });
  if (existing) throw new Error("Role already exists");

  return Role.create(data);
};

export const getRoles = async () => {
  return Role.find();
};

export const updateRole = async (
  id: string,
  data: { name?: string; permissions?: string[] },
) => {
  return Role.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRole = async (id: string) => {
  // 🔥 IMPORTANT EDGE CASE
  const users = await User.find({ role: id });

  if (users.length > 0) {
    throw new Error("Cannot delete role assigned to users");
  }

  return Role.findByIdAndDelete(id);
};
