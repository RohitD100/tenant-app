import { createContext } from "react";
import type { UserContextType } from "./types";

/**
 * UserContext is a React context that holds user-related information and authentication state.
 * This context will be used throughout the application to provide access to the current user
 * and authentication status, as well as actions for managing the user (e.g., logging out, updating user).
 *
 * The context value is expected to be an object that conforms to the `UserContextType` shape.
 * If the context is not yet initialized or if it is used outside of the `UserProvider`, it will default to `null`.
 *
 * Usage:
 *  - `useContext(UserContext)` can be used in components to access the current user and authentication status.
 *  - Ensure that any component consuming this context is wrapped inside the `UserProvider` component.
 */
export const UserContext = createContext<UserContextType | null>(null);
