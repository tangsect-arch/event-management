import { jest } from "@jest/globals";
import mongoose from "mongoose";

import { connectDBTest, disconnectDB } from "../config/db.mjs";
import User from "../models/User.mjs";
import Event from "../models/Event.mjs";
import EventSeating from "../models/EventSeating.mjs";
import Seating from "../models/Seating.mjs";
import { dbInserts } from "./helper.mjs";

import "./auth.test.mjs";
import "./common.test.mjs";
import "./event.test.mjs";
import "./user.test.mjs";
