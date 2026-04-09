import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { getUserDetails } from "../api/auth";
import type { User } from "./types";
import { jwtDecode } from "jwt-decode";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("accessToken"); // match your storage
        if (!token) throw new Error("No token found");

        // Decode JWT to get userId
        const decoded: { id: string } = jwtDecode(token);

        // Fetch user details from API
        const data = await getUserDetails(decoded.id);
        setUser(data);
      } catch (err) {
        console.log("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, loading, setUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
