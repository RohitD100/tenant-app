import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getUsers } from "../api/users";
import { useUser } from "../hooks/useUser";
import { createUser, deactivateUser, updateUser } from "../api/user";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role?: { _id: string; name: string };
  site?: { _id: string; name: string };
  status: "active" | "inactive";
  password?: string;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<IUser> | null>(null);
  const { sites, roles } = useUser();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUsers(page, rowsPerPage, search);
      setUsers(response.data);
      setTotalUsers(response.total);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, page, rowsPerPage, search]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (user?: IUser) => {
    setEditingUser(
      user || {
        name: "",
        email: "",
        role: undefined,
        site: undefined,
        status: "active",
      },
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

  const handleSaveUser = async () => {
    try {
      if (editingUser?._id) {
        await updateUser(editingUser);
      } else {
        await createUser(editingUser);
      }
      handleCloseDialog();
      fetchUsers();
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      await deactivateUser(id);
      fetchUsers();
    } catch (err) {
      console.error("Failed to deactivate user:", err);
    }
  };

  return (
    <Box sx={{ padding: 3, mt: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search by name or email"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Create User
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Site</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role?.name || "-"}</TableCell>
                    <TableCell>{user.site?.name || "-"}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => handleOpenDialog(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeactivate(user["_id"])}
                        disabled={user.status === "inactive"}
                      >
                        Deactivate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={totalUsers}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingUser?._id ? "Edit User" : "Create User"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editingUser?.name || ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={editingUser?.email || ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              value={editingUser?.role?._id || ""}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  role: { _id: e.target.value, name: "" },
                })
              }
            >
              {roles.map((r) => (
                <MenuItem key={r.name} value={r["_id"]}>
                  {r.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Site</InputLabel>
            <Select
              value={editingUser?.site?._id || ""}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  site: { _id: e.target.value, name: "" },
                })
              }
            >
              {sites.map((s) => (
                <MenuItem key={s.name} value={s["_id"]}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {!editingUser?._id && (
            <TextField
              margin="dense"
              label="Password"
              fullWidth
              value={editingUser?.password || ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, password: e.target.value })
              }
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
