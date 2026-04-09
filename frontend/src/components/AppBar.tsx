import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "../hooks/useUser";

export default function ButtonAppBar() {
  const { user } = useUser();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {user && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome!
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Button
              onClick={() => (window.location.href = "/login")}
              color="inherit"
            >
              Sign In
            </Button>
            <Button
              onClick={() => (window.location.href = "/signup")}
              color="inherit"
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
