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
import type { Site, Timezone } from "../types/site";
import { useUser } from "../hooks/useUser";
import { PERMISSIONS } from "../constants/permissions";

const SitesManagement = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSite, setCurrentSite] = useState<Site>({
    id: null,
    name: "",
    location: "",
    status: "active",
    timezone: "",
  });
  const { permissions } = useUser();

  const fetchSites = async () => {
    try {
      const response = await getSites();
      const mappedSites = response.map((site: any) => ({
        id: site["_id"],
        name: site.name,
        location: site.location,
        status: site.status,
        timezone: site.timezone || "",
      }));
      setSites(mappedSites);
    } catch (error) {
      console.error("Failed to fetch sites:", error);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  useEffect(() => {
    const fetchTimeZones = async () => {
      try {
        const response = await fetch(
          `https://api.timezonedb.com/v2.1/list-time-zone?key=${import.meta.env.VITE_TIMEZONE_API_KEY}&format=json`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTimezones(data.zones);
      } catch (err) {
        console.error("Failed to fetch time zones:", err);
      } finally {
        if (typeof setLoading === "function") {
          setLoading(false);
        }
      }
    };

    fetchTimeZones();
  }, []);

  const handleOpenDialog = (
    site: Site = {
      id: null,
      name: "",
      location: "",
      status: "active",
      timezone: "",
    },
  ) => {
    setCurrentSite(site);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentSite({
      id: null,
      name: "",
      location: "",
      status: "active",
      timezone: "",
    });
  };

  const handleSaveSite = async () => {
    setLoading(true);
    try {
      if (currentSite.id === null) {
        const response = await createSite(
          currentSite.name,
          currentSite.location,
          currentSite.status,
          currentSite.timezone,
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
          currentSite.timezone,
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
      setLoading(false);
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
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        🌍 Sites Management
      </Typography>

      {permissions.includes(PERMISSIONS.CREATE_SITE) && (
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Create Site
        </Button>
      )}

      {permissions.includes(PERMISSIONS.READ_SITE) ? (
        <Typography variant="h6">
          You don't have permission to view sites
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Timezone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell>{site.name}</TableCell>
                  <TableCell>{site.location}</TableCell>
                  <TableCell>{site.timezone}</TableCell>
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
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentSite.id ? "Update Site" : "Create Site"}
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Site Name"
            fullWidth
            value={currentSite.name}
            onChange={(e) =>
              setCurrentSite({
                ...currentSite,
                name: e.target.value,
              })
            }
          />

          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={currentSite.location}
            onChange={(e) =>
              setCurrentSite({
                ...currentSite,
                location: e.target.value,
              })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Timezone</InputLabel>
            <Select
              value={currentSite.timezone}
              label="Timezone"
              onChange={(e) =>
                setCurrentSite({
                  ...currentSite,
                  timezone: e.target.value,
                })
              }
            >
              {timezones &&
                timezones.map((tz) => (
                  <MenuItem key={tz.zoneName} value={tz.zoneName}>
                    {" "}
                    {/* Use tz.zoneName or any other unique property */}
                    {tz.zoneName}{" "}
                    {/* Or any other property you want to display */}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

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
            disabled={loading}
          >
            {loading ? "Saving..." : currentSite.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SitesManagement;
