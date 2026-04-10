import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { getUserDetails } from "../api/auth";
import type { Role, Site, User } from "./types";
import { jwtDecode } from "jwt-decode";
import { getRoles } from "../api/role";
import { getSites } from "../api/site";

/**
 * The `UserProvider` component is responsible for managing the user authentication state,
 * fetching user data, roles, and sites, and providing this information to child components
 * via the `UserContext`.
 *
 * It also handles the login state, user details, roles, sites, and loading state, while providing
 * a logout function.
 *
 * This component should wrap the root or relevant parts of your app to allow other components
 * to consume user-related context data.
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  /**
   * `user` holds the current user's details or `null` if no user is authenticated.
   * It is populated once the user details are successfully fetched from the API.
   */
  const [user, setUser] = useState<User | null>(null);

  /**
   * `roles` holds the list of roles assigned to the user.
   * It is populated once the roles data is fetched from the API.
   */
  const [roles, setRoles] = useState<Role[]>([]);

  /**
   * `sites` holds the list of sites associated with the user.
   * It is populated once the sites data is fetched from the API.
   */
  const [sites, setSites] = useState<Site[]>([]);

  /**
   * `loading` is a boolean flag indicating if the user, roles, and sites data is still being loaded.
   * It is initially `true` and is set to `false` once all data is fetched or an error occurs.
   */
  const [loading, setLoading] = useState(true);

  /**
   * `isLoggedIn` is a derived value indicating if a user is logged in.
   * It is `true` if `user` is not `null` and `false` otherwise.
   */
  const isLoggedIn = !!user;

  useEffect(() => {
    /**
     * This function fetches user details, roles, and sites from the API.
     * It decodes the JWT token to get the user's ID and then makes API requests
     * to get the user's information, roles, and sites.
     */
    const fetchUser = async () => {
      try {
        // Get the access token from sessionStorage
        const token = sessionStorage.getItem("accessToken");
        if (!token) throw new Error("No token found");

        // Decode JWT token to extract the user ID
        const decoded: { id: string } = jwtDecode(token);

        // Fetch the user's details from the API using the user ID
        const data = await getUserDetails(decoded.id);
        setUser(data);

        // Fetch roles associated with the user
        const userRoles = await getRoles();
        setRoles(userRoles);

        // Fetch sites associated with the user
        const userSites = await getSites();
        setSites(userSites);
      } catch (err) {
        console.log("Error fetching user:", err);
        setUser(null); // Set user to null if there's an error
        setRoles([]); // Clear roles if there's an error
        setSites([]); // Clear sites if there's an error
      } finally {
        // Set loading to false after attempting to fetch data
        setLoading(false);
      }
    };

    // Invoke the fetch function on mount
    fetchUser();
  }, []);

  /**
   * `logout` function logs the user out by clearing the user, roles, and sites state.
   */
  const logout = () => {
    setUser(null);
    setRoles([]);
    setSites([]);
  };

  return (
    /**
     * Provide the user context to all child components.
     * The `value` prop contains the state and actions related to user authentication and data.
     */
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
