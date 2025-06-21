import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
  updateEventSeating,
} from "../controllers/eventController.mjs";

const router = express.Router();

router
  .get("/event", getEvents)
  .post("/event", createEvent)
  .put("/event/:id", updateEvent)
  .delete("/event/:id", deleteEvent)
  .put("/event/:id/seating/:seatingId", updateEventSeating);

export default router;
