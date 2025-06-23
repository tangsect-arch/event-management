import express from "express";
import {
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
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (starts from 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of events
 *       401:
 *         description: Unauthorized
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
 *       401:
 *        description: Unauthorized
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
 *       401:
 *         description: Unauthorized
 */

router
  .get("/event", getEvents)
  .get("/event/:id", getEventById)
  .get("/event/:id/seating", getEventSeatingByEventId)
  .get("/event/:id/seating/:seatingId", getEventSeatingBySeatingId);

export default router;
