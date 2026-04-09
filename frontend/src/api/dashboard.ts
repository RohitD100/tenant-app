import API from "./axios";

export const getDashboard = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");
  const res = await API.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
