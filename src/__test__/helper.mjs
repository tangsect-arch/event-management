import request from "supertest";
import app from "../../app.mjs";
import User from "../models/User.mjs";
import Event from "../models/Event.mjs";
import EventSeating from "../models/EventSeating.mjs";

const now = new Date();

export const dbInserts = async () => {
  const users = await User.insertMany([
    {
      username: "testadmin",
      password: "$2b$10$2/iipf18qpABNpMNv59lZeobdZWz5CNEeZT5icU135G0wjRXy4uQu",
      role: "admin",
      email: "testadmin@mail.com",
      name: "Test Admin",
    },
    {
      username: "testuser",
      password: "$2b$10$2/iipf18qpABNpMNv59lZeobdZWz5CNEeZT5icU135G0wjRXy4uQu",
      role: "user",
      email: "testuser@mail.com",
      name: "Test Admin",
    },
  ]);

  const adminId = users[0]._id;
  const userId = users[1]._id;

  const event = await Event.insertMany([
    {
      eventName: "Music Fest " + now.getTime(),
      eventDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
      location: "Chennai",
      description: "A big music festival",
    },
    {
      eventName: "Tech Conference " + (now.getTime() + 1),
      eventDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      location: "Bangalore",
      description: "Annual tech meetup",
    },
    {
      eventName: "Art Show " + (now.getTime() + 2),
      eventDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      location: "Delhi",
      description: "Exhibition of modern art",
    },
    {
      eventName: "my new event " + now.getTime(),
      eventDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      location: "Hyderabad",
      description: "test description",
    },
  ]);

  const eventId = event[1]._id;

  const eventSeatingId = await EventSeating.insertMany([
    {
      eventId: event[1]._id,
      seatingName: "VIP Section",
      seatingType: "VIP",
      seatCapacity: 100,
      remainingSeats: 100,
      pricePerSeat: 1500,
    },
    {
      eventId: event[1]._id,
      seatingName: "Regular Section",
      seatingType: "Regular",
      seatCapacity: 200,
      pricePerSeat: 1000,
      remainingSeats: 100,
    },
    {
      eventId: event[1]._id,
      seatingName: "Economy Section",
      seatingType: "Economy",
      seatCapacity: 300,
      pricePerSeat: 500,
      remainingSeats: 100,
    },
  ]);
};

export const loginAndGetToken = async ({ username, password }) => {
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({ username, password });
  return await res.body.token;
};

export const eventAndSeating = async ({ username, password }) => {
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({ username, password });

  return await res.body.token;
};

export const getEventAndSeatingIds = async () => {
  // const event = await Event.create({
  //   eventName: "Music Fest" + now.getTime(),
  //   eventDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
  //   location: "Kochi",
  //   description: "A big music festival",
  // });

  // await EventSeating.create({
  //   eventId: event._id,
  //   seatingName: "Economy Section",
  //   seatingType: "Economy",
  //   seatCapacity: 300,
  //   pricePerSeat: 500,
  //   remainingSeats: 100,
  // });

  const eventSeating = await EventSeating.findOne({})
    .sort({ createdAt: -1 })
    .lean();

  if (!eventSeating) {
    throw new Error("No event seating found in the database");
  }

  const eventId = eventSeating.eventId;
  const eventSeatingId = eventSeating._id;

  return { eventId, eventSeatingId };
};
