import swaggerJSDoc from "swagger-jsdoc";
import { default as swaggerAutogen } from "mongoose-to-swagger";
import User from "../models/User.mjs";
import Event from "../models/Event.mjs";
import EventSeating from "../models/EventSeating.mjs";
import Seating from "../models/Seating.mjs";

import { env } from "../config/env.mjs";

const userSchema = swaggerAutogen(User);
const eventSchema = swaggerAutogen(Event);
const eventSeatingSchema = swaggerAutogen(EventSeating);
const seatingSchema = swaggerAutogen(Seating);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Booking API",
      version: "1.0.0",
      description: "API docs for login, register, event, and booking",
    },
    servers: [{ url: `http://localhost:${env.PORT}` }],
    components: {
      schemas: {
        User: userSchema,
        Event: eventSchema,
        EventSeating: eventSeatingSchema,
        Seating: seatingSchema,
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.mjs"],
  basePath: "/api/v1",
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
