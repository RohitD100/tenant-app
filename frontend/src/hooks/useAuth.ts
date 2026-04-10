import { useNavigate } from "react-router-dom";

/**
 * Custom hook for managing user authentication in a React app.
 * This hook provides methods to log in and log out a user,
 * and it also handles token storage and navigation between routes.
 *
 * @returns {Object} - Returns an object containing `login` and `logout` functions.
 */
export const useAuth = () => {
  // The `useNavigate` hook is used to programmatically navigate to different routes.
  const navigate = useNavigate();

  /**
   * Logs the user in by storing the token in localStorage and navigating to the home page.
   *
   * @param {string} token - The authentication token to be saved in localStorage.
   * @returns {void}
   */
  const login = (token: string) => {
    // Store the token in the localStorage for persistent login across sessions.
    localStorage.setItem("token", token);
    // Navigate the user to the home page after successful login.
    navigate("/");
  };

  /**
   * Logs the user out by removing the token from localStorage and navigating to the login page.
   *
   * @returns {void}
   */
  const logout = () => {
    // Remove the token from localStorage to log the user out.
    localStorage.removeItem("token");
    // Redirect the user to the login page after logout.
    navigate("/login");
  };

  // Return the login and logout functions to be used in components.
  return { login, logout };
};
