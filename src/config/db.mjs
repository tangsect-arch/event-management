import mongoose from "mongoose";
import { env } from "./env.mjs";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.DB_URL);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Database connected successfully");
});
mongoose.connection.on("error", (error) => {
  console.error("Database connection error:", error);
});

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
};
