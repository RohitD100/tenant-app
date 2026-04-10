import type { IUser } from "../pages/UsersManagement";
import API from "./axios";

export const createUser = async (data: Partial<IUser> | null) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.post("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateUser = async (data: Partial<IUser>) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.put(
    `/users/${data["_id"]}`,
    { ...data, status: "active" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const deactivateUser = async (userId: string) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.patch(
    `/users/${userId}/deactivate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
