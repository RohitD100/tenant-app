import { useContext } from "react";
import { UserContext } from "../context/UserContext";

/**
 * Custom hook to access the current user context.
 * This hook allows components to consume user data from the UserContext.
 *
 * @throws {Error} If the hook is used outside of the UserProvider, an error is thrown.
 * @returns {Object} - The context value provided by the UserContext, typically containing user-related data.
 */
export const useUser = () => {
  // Access the UserContext value using useContext.
  const context = useContext(UserContext);

  // If context is not available (i.e., the hook is used outside the UserProvider), throw an error.
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  // Return the user context value (e.g., user data).
  return context;
};
