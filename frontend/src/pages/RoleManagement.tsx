/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { createRole, deleteRole, getRoles, updateRole } from "../api/role";
import { PERMISSIONS } from "../constants/permissions";

interface Role {
  id: string | null;
  name: string;
  permissions: string[];
}

// Convert PERMISSIONS object to an array for the dropdown
const allPermissions = Object.values(PERMISSIONS);

// Helper to make permissions more readable in UI
const formatPermission = (perm: string) =>
  perm
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const RolesManagement = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>({
    id: null,
    name: "",
    permissions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || err.message || "Axios error";
    } else if (err instanceof Error) {
      return err.message;
    } else {
      return "Unknown error occurred";
    }
  };

  // Fetch roles from backend
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRoles();
      const mappedRoles = response.map((role: any) => ({
        id: role["_id"],
        name: role.name,
        permissions: role.permissions || [],
      }));
      setRoles(mappedRoles);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleOpenDialog = (
    role: Role = { id: null, name: "", permissions: [] },
  ) => {
    setCurrentRole(role);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentRole({ id: null, name: "", permissions: [] });
  };

  const handleSaveRole = async () => {
    if (!currentRole.name.trim()) {
      setError("Role name is required!");
      return;
    }
    setLoading(true);
    try {
      if (currentRole.id === null) {
        await createRole(currentRole.name, currentRole.permissions);
        fetchRoles();
      } else {
        await updateRole(
          currentRole.name,
          currentRole.permissions,
          currentRole.id,
        );
        fetchRoles();
      }
      handleCloseDialog();
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (id: string | null) => {
    if (!id) return;
    setLoading(true);
    try {
      await deleteRole(id);
      setRoles(roles.filter((r) => r.id !== id));
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        🛡️ Roles Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Create Role
      </Button>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {role.permissions.map((p) => (
                    <Chip
                      key={p}
                      label={formatPermission(p)}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(role)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteRole(role.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {currentRole.id ? "Update Role" : "Create Role"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            type="text"
            fullWidth
            value={currentRole.name}
            onChange={(e) =>
              setCurrentRole({ ...currentRole, name: e.target.value })
            }
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Permissions</InputLabel>
            <Select
              multiple
              value={currentRole.permissions}
              onChange={(e) =>
                setCurrentRole({
                  ...currentRole,
                  permissions:
                    typeof e.target.value === "string"
                      ? e.target.value.split(",")
                      : e.target.value,
                })
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((p) => (
                    <Chip key={p} label={formatPermission(p)} size="small" />
                  ))}
                </Box>
              )}
            >
              {allPermissions.map((permission) => (
                <MenuItem key={permission} value={permission}>
                  {formatPermission(permission)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveRole}
            variant="contained"
            disabled={loading}
          >
            {loading ? "Saving..." : currentRole.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RolesManagement;
