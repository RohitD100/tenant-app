import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import UsersManagement from "../pages/UsersManagement";
import SiteManagement from "../pages/SiteManagement";
import RoleManagement from "../pages/RoleManagement";

export const router = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/users", element: <UsersManagement /> },
  { path: "/sites", element: <SiteManagement /> },
  { path: "/roles", element: <RoleManagement /> },
]);
