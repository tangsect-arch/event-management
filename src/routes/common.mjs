import express from "express";
import {
  eventLists,
  getEventById,
  getEvents,
  getEventSeatingByEventId,
  getEventSeatingBySeatingId,
} from "../controllers/eventController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Common Events and Seating
 *   description: Route to view events and seating
 */

/**
 * @swagger
 * /api/v1/common/event:
 *   get:
 *     summary: Get all events
 *     tags: [Common Events and Seating]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Partial match on event name (case-insensitive)
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Partial match on location (case-insensitive)
 *       - in: query
 *         name: fromDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (MM-DD-YYYY). Must be today or later.
 *       - in: query
 *         name: toDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (MM-DD-YYYY). Must be after fromDate.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of events per page
 *     responses:
 *       200:
 *         description: List of events
 */

/**
 * @swagger
 * /api/v1/common/event/{id}/seating:
 *   get:
 *     summary: Get event seating by  event id
 *     tags: [Common Events and Seating]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event
 *     responses:
 *       200:
 *         description: list of event seating
 */

/**
 * @swagger
 * /api/v1/common/event/{id}/seating/{seatingId}:
 *   get:
 *     summary: Get event seating by seating id
 *     tags: [Common Events and Seating]
 *     parameters:
 *       - in: path
 *         name: eventId
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
 *             type: object *
 *             properties:
 *               userId:
 *                 type: string
 *                 required: true
 *               seatCount:
 *                 type: number
 *                 required: true
 *               seatingType:
 *                 type: number
 *                 required: true
 *     responses:
 *       201:
 *         description: Booking successful
 */

router
  .get("/event", eventLists)
  .get("/event/:id", getEventById)
  .get("/event/:id/seating", getEventSeatingByEventId)
  .get("/event/:id/seating/:seatingId", getEventSeatingBySeatingId);

export default router;
