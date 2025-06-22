import request from "supertest";
import app from "../../app.mjs";
import { loginAndGetToken, getEventAndSeatingIds } from "./helper.mjs";

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

    expect(response.body.message).toBe("Event created successfully");
  });

  it("should not register duplicate event entry", async () => {
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

    expect(response.body.message).toBe("Event already exists"); // Adjust if needed
  });
});

describe("Event Pagination", () => {
  it("should fetch paginated events", async () => {
    const response = await request(app)
      .get("/api/v1/admin/event?limit=10&page=1")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe("Events fetched successfully");
  });
});

describe("Get Event by ID", () => {
  it("should fetch an event by ID", async () => {
    const response = await request(app)
      .get(`/api/v1/admin/event/${eventId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe("Event fetched successfully");
  });
});

describe("Event Seating API Tests", () => {
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

  it("should not allow duplicate event seating", async () => {
    const response = await request(app)
      .post(`/api/v1/admin/event/${eventId}/seating`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        seatingType: "VIP",
        seatCapacity: 100,
        pricePerSeat: 1000,
      })
      .expect(400);

    expect(response.body.message).toBe("Event seating already exists"); // Adjust as needed
  });
});
