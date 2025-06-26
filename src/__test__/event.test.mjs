import request from "supertest";
import app from "../../app.mjs";
import { getEventAndSeatingIds, loginAndGetToken } from "./helper.mjs";

let token;
// let token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWQzYWUyYjk5YzZkODUxNDI1NjE5YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDk0MjY2MCwiZXhwIjoxNzUwOTQ2MjYwfQ.SChDn0tHD2m_VPOYMlxoZRW_oFFhH6Gcb2EV3HRr6uk";
const eventId = "685d3ae2b99c6d85142561a1";
const eventSeatingId = "685d3ae2b99c6d85142561a7";

beforeAll(async () => {
  token = await loginAndGetToken({
    username: "testadmin",
    password: "password123",
  });
});

describe("Event API Tests", () => {
  it("should create a new event", async () => {
    const response = await request(app)
      .post("/api/v1/admin/event")
      .set("Authorization", `Bearer ${token}`)
      .send({
        eventName: "test event12",
        eventDate: "2026-06-29T00:00:00.000Z",
        location: "tvpm",
        description: "test",
      })
      .expect(201);
    expect(response.body.message).toBe("Event created successfully");
  });

  it("should not register duplicate entry", async () => {
    const response = await request(app)
      .post("/api/v1/admin/event")
      .set("Authorization", `Bearer ${token}`)
      .send({
        eventName: "test event",
        eventDate: "2026-05-21T00:00:00.000Z",
        location: "tvpm",
        description: "test",
      })
      .expect(400);
    expect(response.body.message).toBe(
      "Event with the same location and date already exists."
    );
  });
});

describe("Event API Tests", () => {
  it("should create a new event", async () => {
    const response = await request(app)
      .put("/api/v1/admin/event/" + eventId)
      .set("Authorization", `Bearer ${token}`)
      .send({
        eventName: "test event1",
        eventDate: "2026-05-23T00:00:00.000Z",
        location: "tvpm",
        description: "test",
      })
      .expect(200);

    expect(response.body.message).toBe("Event updated successfully");
  });
});

describe("EventSeating API Tests", () => {
  it("should create new event seating", async () => {
    const response = await request(app)
      .post(`/api/v1/admin/event/${eventId}/seating`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        seatingType: "Regular",
        seatCapacity: 100,
        pricePerSeat: 1000,
      })
      .expect(201);
    expect(response.body.message).toBe("Event seating created successfully");
  });

  it("should not register duplicate seating entry", async () => {
    const response = await request(app)
      .post(`/api/v1/admin/event/${eventId}/seating`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        seatingType: "Regular",
        seatCapacity: 100,
        pricePerSeat: 1000,
      })
      .expect(400);

    expect(response.body.message).toBe("Event seating already exist");
  });

  it("should update existing event seating", async () => {
    const response = await request(app)
      .put(`/api/v1/admin/event/${eventId}/seating/${eventSeatingId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        seatingType: "VIP",
        seatCapacity: 150,
        pricePerSeat: 1100,
      })
      .expect(200);

    expect(response.body.message).toBe("Seating updated successfully");
  });
});
