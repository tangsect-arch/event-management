// import dotenv from "dotenv";
// dotenv.config();

import { connectDB } from "./src/config/db.mjs";
import {
  dbInserts,
  getEventAndSeatingIds,
  loginAndGetToken,
} from "./src/__test__/helper.mjs";
import User from "./src/models/User.mjs";

await connectDB();
const users = await User.find({});
if (users.length === 0) {
  await dbInserts();
}

globalThis.TEST_CONTEXT = {}; // store shared values

beforeAll(async () => {
  await connectDB();

  globalThis.TEST_CONTEXT.token = await loginAndGetToken({
    username: "testadmin",
    password: "testpassword123",
  });

  const eventDetails = await getEventAndSeatingIds();
  globalThis.TEST_CONTEXT.eventId = eventDetails.eventId;
  globalThis.TEST_CONTEXT.eventSeatingId = eventDetails.eventSeatingId;
});
