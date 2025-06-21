import superfast from "superfast";
import mongoose from "mongoose";
import app from "../../app.js";

import { connectDB, disconnectDB } from "../config/db.mjs";
import User from "../models/User.mjs";

beforeAll(async () => {
  process.env.mongo_uri = "mongodb://localhost:27017/jest-test";
  await connectDB();
});

// afterEach(async () => {
//   await User.deleteMany();
// });

afterAll(async () => {
  await disconnectDB();
  mongoose.connection.close();
  process.exit(0);
});

describe("Auth API Tests", () => {
  it("should register a new user", async () => {
    const response = await superfast(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "sabari@mail.com",
        password: "password123",
        name: "Test User",
        role: "user",
      })
      .expect(201);
    expect(response.body.message).toBe("User created successfully");
  });
  it("should not register duplicate entry", async () => {
    await superfast(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "sabari@mail.com",
        password: "password123",
        name: "Test User",
        role: "user",
      })
      .expect(400);
    expect(response.body.message).toBe("User already exists");
  });
});

describe("Auth API Tests", () => {
  it("should login an existing user with correct credentials", async () => {
    const response = await superfast(app)
      .post("/api/auth/login")
      .send({
        username: "testuser",
        password: "password123",
      })
      .expect(200);
    expect(response.body.message).toBe("Login successful");
  });
  it("should not allow user with wrong password", async () => {
    await superfast(app)
      .post("/api/auth/login")
      .send({
        username: "testuser",
        password: "password1234",
      })
      .expect(400);
    expect(response.body.message).toBe("Invalid password");
  });
  it("should not allow user with wrong password", async () => {
    await superfast(app)
      .post("/api/auth/login")
      .send({
        username: "testuser1",
        password: "password123",
      })
      .expect(400);
    expect(response.body.message).toBe("User not found");
  });
});
