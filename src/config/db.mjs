import mongoose from "mongoose";
import { env, test_env } from "./env.mjs";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.DB_URL);
  } catch (error) {
    process.exit(1);
  }
};

export const connectDBTest = async () => {
  await mongoose.connect(test_env.DB_URL);
};

mongoose.connection.on("connected", () => {});
mongoose.connection.on("error", (error) => {});

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {}
};
