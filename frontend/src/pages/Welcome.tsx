import { Box, Typography } from "@mui/material";

export default function Welcome() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h4">
          Welcome to the Tenant App!
        </Typography>
      </Box>
    </>
  );
}
