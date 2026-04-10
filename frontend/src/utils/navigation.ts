/**
 * Handles navigation by updating the browser's location to the specified path.
 * This function is designed to safely perform navigation using `window.location.href`
 * if the `window` object is available.
 * 
 * @param {string} path - The path to navigate to. This should be a valid URL path (e.g., "/dashboard").
 * 
 * @example
 * // Navigate to the home page
 * handleNavigation("/");
 * 
 * @returns {void} 
 * This function does not return any value. It simply performs the navigation.
 */
export const handleNavigation = (path: string): void => {
  if (window) {
    // Ensure `window` is defined before performing navigation
    window.location.href = path; // Navigate using window.location.href
  }
};