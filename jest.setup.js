// import dotenv from "dotenv";
// dotenv.config();

import { connectDBTest, disconnectDB } from "./src/config/db.mjs";
import {
  dbInserts,
  getEventAndSeatingIds,
  loginAndGetToken,
} from "./src/__test__/helper.mjs";
import Event from "./src/models/Event.mjs";
import User from "./src/models/User.mjs";
import EventSeating from "./src/models/EventSeating.mjs";
import Seating from "./src/models/Seating.mjs";

globalThis.TEST_CONTEXT = {};

beforeAll(async () => {
  await connectDBTest();
  await dbInserts();

  globalThis.TEST_CONTEXT.token = await loginAndGetToken({
    username: "testadmin",
    password: "testpassword123",
  });

  const eventDetails = await getEventAndSeatingIds();
  globalThis.TEST_CONTEXT.eventId = eventDetails.eventId;
  globalThis.TEST_CONTEXT.eventSeatingId = eventDetails.eventSeatingId;
});

await afterAll(async () => {
  await User.deleteMany();
  await Event.deleteMany();
  await EventSeating.deleteMany();
  await Seating.deleteMany();
  await disconnectDB();
});
