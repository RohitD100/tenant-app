import API from "./axios";

export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signup = (data: any) => API.post("/auth/signup", data);

export const getUserDetails = async (id: string) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};
