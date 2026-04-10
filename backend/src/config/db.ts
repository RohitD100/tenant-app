import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the URI provided in the environment variable `MONGO_URI`.
 * 
 * This function uses `mongoose.connect` to establish a connection to the database. If the connection is successful,
 * a success message is logged. If there is an error, it is logged, and the process exits with a failure status.
 * 
 * @throws Will exit the process with code 1 if there is an error connecting to the database.
 */
const connectDB = async (): Promise<void> => {
  try {
    // Log the Mongo URI (for debugging purposes)
    console.log(process.env.MONGO_URI as string);
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);
    
    // Log successful connection
    console.log("MongoDB connected");
  } catch (err) {
    // Log any error that occurs during the connection attempt
    console.error(err);
    
    // Exit the process with a failure status
    process.exit(1);
  }
};

export default connectDB;