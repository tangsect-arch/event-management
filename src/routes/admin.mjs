import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
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
  .put("/event/:id/seating/:seatingId", updateEventSeating);

export default router;
