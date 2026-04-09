import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { getUserDetails } from "../api/auth";
import type { User } from "./types";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails();
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
