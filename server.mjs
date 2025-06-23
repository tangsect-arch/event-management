import app from "./app.mjs";

import { connectDB } from "./src/config/db.mjs";
import { env } from "./src/config/env.mjs";

(async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`http://localhost:${env.PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
})();
