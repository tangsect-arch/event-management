import express from "express";
import {
  createEvent,
  createEventSeating,
  deleteEvent,
  getEventById,
  getEvents,
  getEventSeatingById,
  updateEvent,
  updateEventSeating,
} from "../controllers/eventController.mjs";

const router = express.Router();

router
  .get("/event", getEvents)
  .post("/event", createEvent)
  .get("/event/:id", getEventById)
  .put("/event/:id", updateEvent)
  .delete("/event/:id", deleteEvent)
  .post("/event/:id/seating", createEventSeating)
  .get("/event/:id/seating", getEventSeatingById)
  .put("/event/:id/seating/:seatingId", updateEventSeating);

export default router;
