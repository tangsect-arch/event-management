import app from "./app.mjs";

import { connectDB } from "./src/config/db.mjs";
import { env } from "./src/config/env.mjs";
import { logger } from "./src/utils/logger.mjs";

(async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      logger.info(`http://localhost:${env.PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
})();
