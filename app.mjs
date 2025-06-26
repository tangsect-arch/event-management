import express from "express";
import rateLimit from "express-rate-limit";
import { corsConfifg, rateLimits } from "./src/config/env.mjs";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

import authRouter from "./src/routes/auth.mjs";
import adminRouter from "./src/routes/admin.mjs";
import userRouter from "./src/routes/user.mjs";
import commonRouter from "./src/routes/common.mjs";
import {
  authMiddleware,
  verifyAdmin,
} from "./src/middlewares/authMiddleware.mjs";

import swaggerSpec from "./src/swagger/swagget.mjs";
import { errorHandler } from "./src/middlewares/errorHandler.mjs";
import { morganConfig } from "./src/utils/logger.mjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimit(rateLimits));
app.use(cors(corsConfifg));
app.use(helmet());

app.use(
  morgan(morganConfig.format, {
    stream: morganConfig.stream,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/common", commonRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", verifyAdmin, adminRouter);
app.use("/api/v1/user", authMiddleware, userRouter);

app.use(errorHandler);

export default app;
