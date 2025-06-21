import express from "express";
import rateLimit from "express-rate-limit";
import { rateLimits } from "./src/config/env.mjs";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./src/config/db.mjs";
import { env } from "./src/config/env.mjs";
import authRouter from "./src/routes/auth.mjs";
import adminRouter from "./src/routes/admin.mjs";
import userRouter from "./src/routes/user.mjs";
import {
  authMiddleware,
  verifyAdmin,
} from "./src/middlewares/authMiddleware.mjs";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(rateLimit(rateLimits));
app.use(cors);

// console.log("jjjjj");
app.get("/test", (req, res) => {
  console.log("jjjkkkk");
  res.send("Hello, World!");
});

app.use("api/v1/auth", authRouter);
app.use("api/v1/admin", verifyAdmin, adminRouter);
app.use("api/v1/user", authMiddleware, userRouter);

export default app;
