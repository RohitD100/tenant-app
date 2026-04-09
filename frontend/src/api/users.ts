import type { IUser } from "../pages/UsersManagement";
import API from "./axios";

export const getUsers = async (
  page: number,
  rowsPerPage: number,
  search: string,
) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");
  const res = await API.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page + 1,
      limit: rowsPerPage,
      search,
    },
  });
  return res.data;
};

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
