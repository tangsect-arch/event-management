import request from "supertest";
import app from "../app.js"; 
import User from "../models/User.js";

export async function loginAndGetToken({
  username,
  password,
  role,
  email,
  name,
}) {
  await User.create({ username, password, role, email, name });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ username, password });

  return res.body.token;
}

export async function getEventAndSeating({
  username,
  password,
  role,
  email,
  name,
}) {
  await User.create({ username, password, role, email, name });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ username, password });

  return res.body.token;
}
