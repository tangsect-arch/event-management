import express from "express";
import {
  createEvent,
  createEventSeating,
  deleteEvent,
  getEventById,
  getEvents,
  getEventSeatingByEventId,
  updateEvent,
  updateEventSeating,
} from "../controllers/eventController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Events
 *   description: Route to manage events and event seating
 */

/**
 * @swagger
 * /api/v1/admin/event/:
 *   post:
 *     summary: Create a new event seating
 *     tags: [Admin Events]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seatingType
 *               - seatCapacity
 *               - pricePerSeat
 *             properties:
 *               seatingType:
 *                 type: string
 *                 enum:
 *                   - VIP
 *                   - Regular
 *                   - Economy
 *               seatCapacity:
 *                 type: number
 *               pricePerSeat:
 *                 type: number
 *     responses:
 *       201:
 *         description: Seating type created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/admin/event/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Admin Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventName
 *               - eventDate
 *               - location
 *               - description
 *             properties:
 *               eventName:
 *                 type: string
 *               eventDate:
 *                 type: string
 *                 format: mm/dd/yyyy
 *                 description: Date format should be mm/dd/yyyy
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Create an event
 *       401:
 *        description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/admin/event/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Admin Events]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event
 *     responses:
 *       200:
 *         description: Create an event
 *       401:
 *        description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/admin/event/{id}/seating:
 *   post:
 *     summary: Create a new event seating
 *     tags: [Admin Events]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seatingType
 *               - seatCapacity
 *               - pricePerSeat
 *             properties:
 *               seatingType:
 *                 type: string
 *                 enum:
 *                   - VIP
 *                   - Regular
 *                   - Economy
 *               seatCapacity:
 *                 type: number
 *               pricePerSeat:
 *                 type: number
 *     responses:
 *       201:
 *         description: Seating type created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/admin/event/{id}/seating/{seatingId}:
 *   put:
 *     summary: Update an event seating
 *     tags: [Admin Events]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seatingType
 *               - seatCapacity
 *               - pricePerSeat
 *             properties:
 *               seatingType:
 *                 type: string
 *                 enum:
 *                   - VIP
 *                   - Regular
 *                   - Economy
 *               seatCapacity:
 *                 type: number
 *               pricePerSeat:
 *                 type: number
 *     responses:
 *       200:
 *         description: Seating type updated successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/admin/event:
 *   get:
 *     summary: Get all events
 *     tags: [Admin Events]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Event name (case-insensitive)
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Location (case-insensitive)
 *       - in: query
 *         name: fromDate
 *
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (MM-DD-YYYY)
 *       - in: query
 *         name: toDate
 *
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (MM-DD-YYYY)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *
 *     responses:
 *       200:
 *         description: List of events
 *       401:
 *         description: Unauthorized
 */

router
  .get("/event", getEvents)
  .post("/event", createEvent)
  .put("/event/:id", updateEvent)
  .delete("/event/:id", deleteEvent)
  .post("/event/:id/seating", createEventSeating)
  .put("/event/:id/seating/:seatingId", updateEventSeating);

export default router;
