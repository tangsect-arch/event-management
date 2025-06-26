import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, "../../.env");

dotenv.config({
  path: envPath,
});

export const env = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.mongo_uri,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
  NODE_ENV: process.env.NODE_ENV || "dev",
  PASSWORD_SALT_ROUNDS: parseInt(process.env.PASSWORD_SALT_ROUNDS, 10) || 10,
};

export const test_env = {
  PORT: process.env.PORT,
  DB_URL: "mongodb://localhost:27017/jest-test",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
  NODE_ENV: process.env.NODE_ENV || "dev",
  PASSWORD_SALT_ROUNDS: parseInt(process.env.PASSWORD_SALT_ROUNDS, 10) || 10,
};

export const corsConfifg = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const rateLimits = {
  windowsMs: 15 * 50 * 100,
  max: 100,
  message: "Too many requests, please try again later.",
};
