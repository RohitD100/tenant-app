/**
 * Handles navigation by updating the browser's history without triggering a page reload.
 * Uses the `window.history.pushState()` method for Single Page Application (SPA) navigation.
 *
 * @param {string} path - The path to navigate to. This should be a valid URL path (e.g., "/dashboard").
 *
 * @example
 * // Navigate to the home page without reloading the page
 * handleNavigation("/");
 *
 * @returns {void}
 * This function does not return any value. It simply performs the navigation.
 */
export const handleNavigation = (path: string): void => {
  if (window) {
    // Update the browser's history using pushState (no page reload)
    window.history.pushState({}, "", path);

    // Manually trigger a route change event to notify React of the location change
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
};

/**
 * Logs the user out of the application.
 *
 * This function clears the session storage, which removes any stored session data,
 * navigates the user to the home page ("/"), and reloads the page to reset the application state.
 *
 * Usage:
 * ```ts
 * logout();
 * ```
 */
export const logout = (): void => {
  sessionStorage.clear(); // Clears all session data from sessionStorage
  handleNavigation("/"); // Navigates the user to the home page
  window.location.reload(); // Reloads the current page to reset the application state
};
