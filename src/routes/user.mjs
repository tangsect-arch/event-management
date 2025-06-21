import express from "express";
import {
  bookEvent,
  cancelBooking,
  getBookingById,
  getBookings,
} from "../controllers/userController.mjs";

const router = express.Router();

router
  .get("/event", getBookings)
  .post("/event/:eventId/eventseating/:eventSeatingId/bookings", bookEvent)
  .get(
    "/event/:eventId/eventseating/:eventSeatingId/bookings/:id",
    getBookingById
  )
  .delete(
    "/event/:eventId/eventseating/:eventSeatingId/bookings/:id",
    cancelBooking
  );

export default router;
