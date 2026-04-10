import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { getUserDetails } from "../api/auth";
import type { User } from "./types";
import { jwtDecode } from "jwt-decode";
import { getRoles } from "../api/role";
import { getSites } from "../api/site";

export interface Role {
  _id: string;
  name: string;
  permissions: string[];
}

export interface Site {
  _id: string;
  name: string;
  location: string;
  status: "active" | "inactive";
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (!token) throw new Error("No token found");

        // Decode JWT to get userId
        const decoded: { id: string } = jwtDecode(token);

        // Fetch user details from API
        const data = await getUserDetails(decoded.id);
        setUser(data);

        // Fetch roles and sites for the user
        const userRoles = await getRoles();
        setRoles(userRoles);

        const userSites = await getSites();
        setSites(userSites);
      } catch (err) {
        console.log("Error fetching user:", err);
        setUser(null);
        setRoles([]);
        setSites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    setUser(null);
    setRoles([]);
    setSites([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        roles,
        sites,
        isLoggedIn,
        loading,
        setUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
