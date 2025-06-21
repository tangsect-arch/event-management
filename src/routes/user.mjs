import express from "express";
import {
  bookEvent,
  cancelBooking,
  getBookingById,
  getBookings,
} from "../controllers/userController.mjs";

const router = express.Router();

router
  .get("/event/bookings", getBookings)
  .post("/event/bookings", bookEvent)
  .get("/event/bookings/:id", getBookingById)
  .delete("/event/bookings/:id", cancelBooking);

export default router;
