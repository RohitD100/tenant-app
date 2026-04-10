import type { Role, Site } from "./UserProvider";

export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  site?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
};

export type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  roles: Role[];
  sites: Site[];
};
