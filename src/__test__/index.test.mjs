import { jest } from "@jest/globals";
import mongoose from "mongoose";

import { connectDB, disconnectDB } from "../config/db.mjs";
import User from "../models/User.mjs";
import Event from "../models/Event.mjs";
import EventSeating from "../models/EventSeating.mjs";
import Seating from "../models/Seating.mjs";

import "./auth.test.mjs";
import "./common.test.mjs";
import "./event.test.mjs";
import "./user.test.mjs";

// await beforeAll(async () => {
//   // process.env.mongo_uri = "mongodb://localhost:27017/jest-test";
//   await connectDB();
//   await dbInserts();
// });

await afterAll(async () => {
  // await User.deleteMany();
  // await Event.deleteMany();
  // await EventSeating.deleteMany();
  // await Seating.deleteMany();
  // await disconnectDB();
  mongoose.connection.close();
});
