/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { createSite, deleteSite, getSites, updateSite } from "../api/site";

interface Site {
  id: string | number | null;
  name: string;
  location: string;
  status: "active" | "inactive";
}

const SitesManagement = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSite, setCurrentSite] = useState<Site>({
    id: null,
    name: "",
    location: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false); // <-- Loading state

  // Fetch all sites from API on mount
  const fetchSites = async () => {
    try {
      const response = await getSites();
      const mappedSites = response.map((site: any) => ({
        id: site["_id"],
        name: site.name,
        location: site.location,
        status: site.status,
      }));
      setSites(mappedSites);
    } catch (error) {
      console.error("Failed to fetch sites:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSites();
    };
    fetchData();
  }, []);

  const handleOpenDialog = (
    site: Site = { id: null, name: "", location: "", status: "active" },
  ) => {
    setCurrentSite(site);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentSite({ id: null, name: "", location: "", status: "active" });
  };

  const handleSaveSite = async () => {
    setLoading(true); // start loading
    try {
      if (currentSite.id === null) {
        const response = await createSite(
          currentSite.name,
          currentSite.location,
          currentSite.status,
        );
        const siteData = response?.data;
        if (siteData) {
          setSites([
            ...sites,
            { ...siteData, id: siteData._id || siteData.id },
          ]);
        }
      } else {
        const response = await updateSite(
          currentSite.name,
          currentSite.location,
          currentSite.status,
          `${currentSite.id}`,
        );
        if (response?.data) {
          setSites(
            sites.map((site) =>
              site.id === currentSite.id
                ? {
                    ...response.data,
                    id: response.data._id || response.data.id,
                  }
                : site,
            ),
          );
        }
      }
      await fetchSites();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save site:", error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleDeleteSite = async (id: string | number | null) => {
    if (!id) return;
    try {
      await deleteSite(`${id}`);
      setSites(sites.filter((site) => site.id !== id));
    } catch (error) {
      console.error("Failed to delete site:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        🌍 Sites Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Create Site
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.name}>
                <TableCell>{site.name}</TableCell>
                <TableCell>{site.location}</TableCell>
                <TableCell>{site.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(site)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteSite(site.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentSite.id ? "Update Site" : "Create Site"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Site Name"
            type="text"
            fullWidth
            value={currentSite.name}
            onChange={(e) =>
              setCurrentSite({ ...currentSite, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            value={currentSite.location}
            onChange={(e) =>
              setCurrentSite({ ...currentSite, location: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={currentSite.status}
              label="Status"
              onChange={(e) =>
                setCurrentSite({
                  ...currentSite,
                  status: e.target.value as "active" | "inactive",
                })
              }
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveSite}
            disabled={loading} // disable while loading
          >
            {loading ? "Saving..." : currentSite.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SitesManagement;
