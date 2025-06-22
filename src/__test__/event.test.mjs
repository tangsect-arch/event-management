import request from "supertest";
import app from "../../app.mjs";
import { loginAndGetToken } from "./helper.test.mjs";

let token;
let eventId;
let eventSeatingId;
beforeAll(async () => {
  token = await loginAndGetToken({
    username: "testuser",
    email: "sabari@mail.com",
    password: "password123",
    name: "Test User",
    role: "admin",
  });
});

describe("Event API Tests", () => {
  it("should create new event", async () => {
    const response = await request(app)
      .post("/api/v1/admin/event")
      .headers({ Authorization: `Bearer ${token}` })
      .send({
        eventName: "test event",
        eventDate: new Date("05/21/2026"),
        location: "tvpm",
        description: "test",
      })
      .expect(201);
    expect(response.body.message).toBe("Event created successfully");
  });
  it("should not register duplicate entry", async () => {
    const response = await request(app)
      .post("/api/v1/admin/event")
      .headers({ Authorization: `Bearer ${token}` })
      .send({
        eventName: "test event",
        eventDate: new Date("05/21/2026"),
        location: "tvpm",
        description: "test",
      })
      .expect(400);
    expect(response.body.message).toBe("Events fetched successfully");
  });
});

describe("Should fetch events", () => {
  it("should fetch events by pagenation", async () => {
    const response = await request(app)
      .get("/api/v1/admin/event?limit=10&page=1")
      .headers({ Authorization: `Bearer ${token}` })
      .send()
      .expect(200);
    expect(response.body.message).toBe("Events fetched successfully");
  });
});

describe("Should fetch event by id", () => {
  it("should create new event", async () => {
    const response = await request(app)
      .get("/api/v1/admin/event/" + eventId)
      .headers({ Authorization: `Bearer ${token}` })
      .send()
      .expect(200);
    expect(response.body.message).toBe("Event fetched successfully");
  });
});

describe("EventSeating API Tests", () => {
  it("should create new event seating", async () => {
    const response = await request(app)
      .post("/api/v1/admin/event/" + eventId + "/seating")
      .headers({ Authorization: `Bearer ${token}` })
      .send({
        seatingType: "VIP",
        seatCapacity: 100,
        pricePerSeat: 1000,
      })
      .expect(201);
    expect(response.body.message).toBe("Event seating created successfully");
  });
  it("should not register duplicate entry", async () => {
    const response = await request(app)
      .post("/api/v1/admin/event/" + eventId + "/seating")
      .headers({ Authorization: `Bearer ${token}` })
      .send({
        seatingType: "VIP",
        seatCapacity: 100,
        pricePerSeat: 1000,
      })
      .expect(400);
    expect(response.body.message).toBe("Event seating fetched successfully");
  });
});
