import mongoose from "mongoose";
import { env } from "./env.mjs";

export const connectDB = async () => {
  try {
    return await mongoose.connect(env.DB_URL);
    // await mongoose.connection.on("connected", () => {
    //   console.log("Database connected successfully");
    // });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
