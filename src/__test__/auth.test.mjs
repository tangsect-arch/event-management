import request from "supertest";
import app from "../../app.js";

describe("Auth API Tests", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({
        username: "testuser",
        email: "sabari@mail.com",
        password: "password123",
        name: "Test User",
        role: "admin",
      })
      .expect(201);
    expect(response.body.message).toBe("User created successfully");
  });
  it("should not register duplicate entry", async () => {
    await request(app)
      .post("/api/v1/auth/register")
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
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: "testuser",
        password: "password123",
      })
      .expect(200);
    expect(response.body.message).toBe("Login successful");
  });
  it("should not allow user with wrong password", async () => {
    await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: "testuser",
        password: "password1234",
      })
      .expect(400);
    expect(response.body.message).toBe("Invalid password");
  });
  it("should not allow user with wrong password", async () => {
    await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: "testuser1",
        password: "password123",
      })
      .expect(400);
    expect(response.body.message).toBe("User not found");
  });
});
