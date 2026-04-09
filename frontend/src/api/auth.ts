import API from "./axios";

export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signup = (data: any) => API.post("/auth/signup", data);

export const getUserDetails = async (userId: string) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");
  const res = await API.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
