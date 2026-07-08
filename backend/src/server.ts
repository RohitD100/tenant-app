import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import redisClient from "./config/redis";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await redisClient.connect();
    console.log("✅ Redis connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to Redis:", error);
    process.exit(1);
  }
}

startServer();