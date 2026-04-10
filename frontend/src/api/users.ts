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
