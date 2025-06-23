import request from "supertest";
import app from "../../app.mjs";

import { getEventAndSeatingIds } from "./helper.mjs";

const eventId = "6857e5dc714ab96cf3304cb2";
const eventSeatingId = "6857e5dc714ab96cf3304cb3";

describe("Event API Tests", () => {
  it("Should fetch events", async () => {
    const response = await request(app)
      .get("/api/v1/common/event")
      .send()
      .expect(200);
    expect(response.body.message).toBe("Events fetched successfully");
  });
});

describe("Event API by event id Tests", () => {
  it("Should fetch events", async () => {
    const response = await request(app)
      .get("/api/v1/common/event/" + eventId)
      .send()
      .expect(200);
    expect(response.body.message).toBe("Event fetched successfully");
  });
});

describe("Seating API by event id Tests", () => {
  it("Should fetch events", async () => {
    const response = await request(app)
      .get("/api/v1/common/event/" + eventId + "/seating")
      .send()
      .expect(200);
    expect(response.body.message).toBe("Event seating fetched successfully");
  });
});

describe("Seating API by seating id Tests", () => {
  it("Should fetch events", async () => {
    const response = await request(app)
      .get(
        "/api/v1/common/events" + "/" + eventId + "/seating/" + eventSeatingId
      )
      .send()
      .expect(200);
    expect(response.body.message).toBe("Event seating fetched successfully");
  });
});
