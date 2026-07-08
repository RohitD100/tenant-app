import swaggerUi from "swagger-ui-express";
import express, { Application } from "express";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import roleRoutes from "./routes/role.routes";
import siteRoutes from "./routes/site.routes";
import userRoutes from "./routes/user.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { swaggerSpec } from "./swagger";

const app: Application = express();

app.use(cors());
app.use(express.json());


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

export default app;
