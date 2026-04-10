import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useUser } from "../hooks/useUser";
import type { Props } from "./types";
import { handleNavigation, logout } from "../utils/navigation";
import { guestNavItems, loggedInNavItems } from "../utils/drawerAppBarUtils";
import { Drawer as CustomDrawer } from "./Drawer";
import MenuIcon from "@mui/icons-material/Menu";

export default function DrawerAppBar(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isLoggedIn } = useUser();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = isLoggedIn ? loggedInNavItems : guestNavItems;

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
                  handleNavigation(item.path);
                }}
              >
                {item.label}
              </Button>
            ))}
            {isLoggedIn && (
              <Button
                sx={{
                  color: "#fff",
                  fontWeight: "normal",
                }}
                onClick={logout}
              >
                {"Logout"}
              </Button>
            )}
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
              width: 240,
            },
          }}
        >
          <CustomDrawer handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </nav>
      <Box sx={{ mt: "20px", width: "100%" }}>{children}</Box>
    </Box>
  );
}
