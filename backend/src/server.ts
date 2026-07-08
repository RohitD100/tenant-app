import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import redisClient from "./config/redis";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    console.log("✅ Database connected");

    await redisClient.connect();
    console.log("✅ Redis connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();