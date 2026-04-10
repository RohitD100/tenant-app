import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { getDashboard } from "../api/dashboard";

interface Metric {
  label: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await getDashboard();

        const mappedMetrics: Metric[] = [
          { label: "Total Users", value: data.totalUsers ?? 0 },
          { label: "Active Users", value: data.activeUsers ?? 0 },
          { label: "Total Roles", value: data.totalRoles ?? 0 },
          { label: "Total Sites", value: data.totalSites ?? 0 },
        ];

        setMetrics(mappedMetrics);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  console.log("error :", error);
  if (error) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {metrics &&
          metrics.map((metric) => (
            <Paper
              key={metric.label}
              sx={{
                flex: "1 1 calc(25% - 16px)",
                minWidth: 200,
                padding: 2,
                textAlign: "center",
                borderRadius: 2,
              }}
              elevation={3}
            >
              <Typography variant="subtitle1" color="text.secondary">
                {metric.label}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {metric.value}
              </Typography>
            </Paper>
          ))}
      </Box>
    </Container>
  );
};

export default Dashboard;
