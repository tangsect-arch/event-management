import request from "supertest";
import app from "../../app.mjs";

const user = {
  username: "test_user_123",
  email: "sampleuser1@mail.com",
  password: "password123",
  name: "Test User",
  role: "admin",
};

describe("Auth API Tests", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(user)
      .expect(201);

    expect(response.body.message).toBe("User created successfully");
  });

  it("should not register duplicate user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(user)
      .expect(400);

    expect(response.body.message).toBe("User already exists");
  });

  it("should login with correct credentials", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: user.username,
        password: user.password,
      })
      .expect(200);

    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
  });

  it("should reject login with incorrect password", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: user.username,
        password: "wrongPassword123",
      })
      .expect(404);
    expect(response.body.message).toBe("Invalid password");
  });

  it("should reject login with non-existent username", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: "nonexistent_user",
        password: "password123",
      })
      .expect(404);

    expect(response.body.message).toBe("User not found");
  });
});
