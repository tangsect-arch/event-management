import mongoose from "mongoose";
import { env } from "./env.mjs";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.DB_URL);
  } catch (error) {
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {});
mongoose.connection.on("error", (error) => {});

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {}
};
