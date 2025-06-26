import request from "supertest";
import app from "../../app.mjs";
import { loginAndGetToken, getEventAndSeatingIds } from "./helper.mjs";

let token;
const eventId = "685d3ae2b99c6d85142561a1";
const eventSeatingId = "685d3ae2b99c6d85142561a7";

beforeAll(async () => {
  token = await loginAndGetToken({
    username: "testuser",
    password: "password123",
  });
});

describe("User API Tests", () => {
  it("Should fetch all bookings", async () => {
    const response = await request(app)
      .get("/api/v1/user/bookings")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe("Event booked successfully");
  });
});

describe("Get Bookings by ID", () => {
  it("should fetch a booking by ID", async () => {
    const response = await request(app)
      .get(`/api/v1/user/booking/${bookingId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe("Booking fetched successfully");
  });
});

describe("Book seats", () => {
  it("should create new booking", async () => {
    const response = await request(app)
      .post(
        `/api/v1/user/event/${eventId}/eventseating/${eventSeatingId}/booking`
      )
      .set("Authorization", `Bearer ${token}`)
      .send({
        seatCount: 2,
      })
      .expect(201);

    expect(response.body.message).toBe("Event seating created successfully");
  });

  it("should not allow duplicate event seating", async () => {
    const response = await request(app)
      .post(
        `/api/v1/user/event/${eventId}/eventseating/${eventSeatingId}/booking`
      )
      .set("Authorization", `Bearer ${token}`)
      .send({
        seatCount: 2,
      })
      .expect(400);

    expect(response.body.message).toBe("Event seating already exists");
  });

  it("should update an existing booing", async () => {
    const response = await request(app)
      .post(
        `/api/v1/user/event/${eventId}/eventseating/${eventSeatingId}/booking/${bookingId}`
      )
      .set("Authorization", `Bearer ${token}`)
      .send({
        seatCount: 3,
      })
      .expect(400);

    expect(response.body.message).toBe("Event seating already exists");
  });
});
