import request from "supertest";
import mongoose from "mongoose";
import app from "../../app.js";

import { connectDB, disconnectDB } from "../config/db.mjs";
import User from "../models/User.mjs";
import Event from "../models/Event.mjs";
import EventSeating from "../models/EventSeating.mjs";
import Seating from "../models/Seating.mjs";

import "./auth.test.mjs";
import "./event.test.mjs";
import "./user.test.mjs";

beforeAll(async () => {
  process.env.mongo_uri = "mongodb://localhost:27017/jest-test";
  await connectDB();
});

afterEach(async () => {
  await User.deleteMany();
  await Event.deleteMany();
  await EventSeating.deleteMany();
  await Seating.deleteMany();
});

afterAll(async () => {
  await disconnectDB();
  mongoose.connection.close();
  process.exit(0);
});
