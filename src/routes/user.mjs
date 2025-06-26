import express from "express";
import {
  bookEvent,
  cancelBooking,
  getBookingById,
  getBookings,
} from "../controllers/userController.mjs";
import {
  getEvents,
  getEventSeatingByEventId,
} from "../controllers/eventController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Events and Bookings
 *   description: Route to manage Bookings and Events for Users
 */

/**
 * @swagger
 * /api/v1/user/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [User Events and Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Bookings
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/user/event/{id}/eventseating/{seatingId}/booking:
 *   post:
 *     summary: Create a booking for an event seating
 *     tags: [User Events and Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event
 *       - in: path
 *         name: seatingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the seating type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatCount:
 *                 type: number
 *                 required: true
 *     responses:
 *       201:
 *         description: Booking successful
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/user/bookings/{id}:
 *   get:
 *     summary: Get booked seat by id
 *     tags: [User Events and Bookings]
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event
 *     responses:
 *       200:
 *         description: List of Bookings
 *       401:
 *        description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/user/event/{id}/eventseating/{seatingId}/booking/{bookingId}:
 *   put:
 *     summary: Create a booking for an event seating
 *     tags: [User Events and Bookings]
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event
 *       - in: path
 *         name: seatingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the seating type
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the booking
 *     responses:
 *       201:
 *         description: Booking successful
 *       401:
 *         description: Unauthorized
 */

router
  .get("/bookings", getBookings)
  .get("bookings/:id", getBookingById)
  .post("/event/:id/eventseating/:seatingId/booking", bookEvent)
  .put("/event/:id/eventseating/:seatingId/booking/:bookingId", cancelBooking);

export default router;
