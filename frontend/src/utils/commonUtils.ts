import { PERMISSIONS } from "../constants/permissions";

// Convert PERMISSIONS object to an array for the dropdown
export const allPermissions = Object.values(PERMISSIONS);

// Helper to make permissions more readable in UI
export const formatPermission = (perm: string) =>
  perm
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
