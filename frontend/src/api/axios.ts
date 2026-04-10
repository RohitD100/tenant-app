import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// Create an axios instance with a base URL.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Axios request interceptor to attach the authorization token to headers.
 * This will automatically attach the token from localStorage if available.
 * @param {InternalAxiosRequestConfig} req - The request configuration object.
 * @returns {InternalAxiosRequestConfig} The modified request configuration with the token attached.
 */
API.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  // Ensure headers are not undefined, and assign token to Authorization
  req.headers = req.headers || {}; // If headers are undefined, initialize them as an empty object.

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
