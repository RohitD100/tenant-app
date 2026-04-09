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
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const decoded: { userId: string } = jwtDecode(token);
        const data = await getUserDetails(decoded.userId);
        setUser(data);
      } catch (err) {
        console.log("err :", err);
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
