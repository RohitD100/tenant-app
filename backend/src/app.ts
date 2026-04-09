import express, { Application } from "express";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import connectDB from "./config/db";
import roleRoutes from "./routes/role.routes";

const app: Application = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

export default app;
