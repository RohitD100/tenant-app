import API from "./axios";

export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const signup = (data) => API.post("/auth/signup", data);
