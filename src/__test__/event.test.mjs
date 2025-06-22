import request from "supertest";
import app from "../../app.mjs";
import { getEventAndSeatingIds, loginAndGetToken } from "./helper.mjs";

let token;
const eventId = "6857e5dc714ab96cf3304cb2";
const eventSeatingId = "6857e5dc714ab96cf3304cb3";

beforeAll(async () => {
  token = await loginAndGetToken({
    username: "testadmin",
    password: "testpassword123",
  });
});

describe("Event API Tests", () => {
  it("should create a new event", async () => {
    const response = await request(app)
      .post("/api/v1/admin/event")
      .set("Authorization", `Bearer ${token}`)
      .send({
        eventName: "test event",
        eventDate: "2026-05-21T00:00:00.000Z",
        location: "tvpm",
        description: "test",
      })
      .expect(201);

    // expect(response.body.message).toBe("Event created successfully");
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

    // expect(response.body.message).toBe("Event already exists"); // Replace this with correct message
  });
});

describe("Event API Tests", () => {
  it("should create a new event", async () => {
    const response = await request(app)
      .post("/api/v1/admin/event/" + eventId)
      .set("Authorization", `Bearer ${token}`)
      .send({
        eventName: "test event1",
        eventDate: "2026-05-21T00:00:00.000Z",
        location: "tvpm",
        description: "test",
      })
      .expect(201);

    expect(response.body.message).toBe("Event created successfully");
  });
});

describe("EventSeating API Tests", () => {
  it("should create new event seating", async () => {
    const response = await request(app)
      .post(`/api/v1/admin/event/${eventId}/seating`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        seatingType: "VIP",
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
        seatingType: "VIP",
        seatCapacity: 100,
        pricePerSeat: 1000,
      })
      .expect(400);

    expect(response.body.message).toBe("Event seating already exists"); // Adjust message
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

    expect(response.body.message).toBe("Event seating updated successfully");
  });
});
