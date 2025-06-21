import app from "./app.mjs";

import { connectDB } from "./src/config/db.mjs";
import { env } from "./src/config/env.mjs";

const startServer = async () => {
  console.log("Starting server...");
  try {
    await connectDB();
    console.log("Database connected successfully");

    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
