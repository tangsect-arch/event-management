import app from "./app.mjs";

import { connectDB } from "./src/config/db.mjs";
import { env } from "./src/config/env.mjs";

const startServer = async () => {
  console.log("Starting server...");
  try {
    connectDB()
      .then(() => {
        console.log("Database connected successfully1");
        app.listen(env.PORT, () => {
          console.log(`Server is running on port ${env.PORT}`);
        });
      })
      .catch((error) => {
        console.error("Database connection error:", error);
        process.exit(1);
      });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
