import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useUser } from "../hooks/useUser";
import type { Props } from "./types";
import { handleNavigation } from "../utils/navigation";

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useUser(); // Custom hook to get user state

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Navigation items depending on user login state
  const loggedInNavItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/users" },
    { label: "Roles", path: "/roles" },
    { label: "Sites", path: "/sites" },
  ];

  const guestNavItems = [
    { label: "Login", path: "/login" },
    { label: "Signup", path: "/signup" },
  ];

  const navItems = user ? loggedInNavItems : guestNavItems;

  // Drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Tanant Application
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                handleNavigation(item.path); // Call the navigation function
                handleDrawerToggle(); // Close the drawer after navigation
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  fontWeight:
                    location.pathname === item.path ? "bold" : "normal",
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Tanant Application
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{
                  color: "#fff",
                  fontWeight:
                    location.pathname === item.path ? "bold" : "normal",
                }}
                onClick={() => {
                  handleNavigation(item.path); // Call the navigation function
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box sx={{ mt: "20px", width: "100%" }}>{children}</Box>
    </Box>
  );
}
