import axios from "axios";
import API from "./axios";

export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signup = (data: any) => API.post("/auth/signup", data);

export const getUserDetails = async () => {
  const res = await axios.get("/me");
  return res.data;
};
