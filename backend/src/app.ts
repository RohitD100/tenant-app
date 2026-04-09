import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";

const app: Application = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

export default app;
