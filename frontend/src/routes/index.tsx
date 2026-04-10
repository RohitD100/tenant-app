import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import UsersManagement from "../pages/UsersManagement";
import SiteManagement from "../pages/SiteManagement";
import RoleManagement from "../pages/RoleManagement";

/**
 * Router configuration for the application.
 * This uses `createBrowserRouter` from `react-router-dom` to define a set of routes and their corresponding components.
 * Each route represents a page or view within the application.
 *
 * @returns {Object} - A browser router instance that can be used with `RouterProvider` in the root of the app.
 */
export const router = createBrowserRouter([
  /**
   * The root path (`/`) corresponds to the Welcome page, which is displayed to users who visit the home URL.
   */
  { path: "/", element: <Welcome /> },

  /**
   * The login page, where users can authenticate by providing their credentials.
   * Path: `/login`
   */
  { path: "/login", element: <Login /> },

  /**
   * The signup page, where users can create a new account.
   * Path: `/signup`
   */
  { path: "/signup", element: <SignUp /> },

  /**
   * The dashboard page, accessible to authenticated users after logging in.
   * Path: `/dashboard`
   */
  { path: "/dashboard", element: <Dashboard /> },

  /**
   * Users management page, typically for administrators to manage users within the application.
   * Path: `/users`
   */
  { path: "/users", element: <UsersManagement /> },

  /**
   * Site management page, where administrators can manage sites or resources in the app.
   * Path: `/sites`
   */
  { path: "/sites", element: <SiteManagement /> },

  /**
   * Role management page for assigning and managing user roles within the application.
   * Path: `/roles`
   */
  { path: "/roles", element: <RoleManagement /> },
]);
