import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { guestNavItems, loggedInNavItems } from "../utils/drawerAppBarUtils";
import { useUser } from "../hooks/useUser";
import { handleNavigation } from "../utils/navigation";
import type { DrawerProps } from "./types";

export const Drawer = ({ handleDrawerToggle }: DrawerProps) => {
  const { isLoggedIn } = useUser();
  const navItems = isLoggedIn ? loggedInNavItems : guestNavItems;

  return (
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
                handleNavigation(item.path);
                handleDrawerToggle();
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
};
