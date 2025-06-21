import Event from "../models/Event.mjs";
import EventSeating from "../models/EventSeating.mjs";
import Seating from "../models/Seating.mjs";

export const createEvent = async (req, res) => {
  try {
    const { name, date, location, description, seatCapacity, pricePerSeat } =
      req.body;
    const newEvent = new Event({
      name,
      date,
      location,
      description,
    });

    await newEvent.save();
    // Create seating for the event
    const newSeating = new Seating({
      eventId: newEvent._id,
      seatCapacity,
      remainingSeats: seatCapacity,
      pricePerSeat,
    });
    await newSeating.save();

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("seating");
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("seating");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, location, description } = req.body;

    const event = await Event.findByIdAndUpdate(
      id,
      { name, date, location, description },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete associated seating
    await EventSeating.deleteMany({ eventId: id });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEventSeating = async (req, res) => {
  try {
    const { id } = req.params;
    const { seatCapacity } = req.body;

    const seating = await EventSeating.findOneAndUpdate(
      { eventId: id },
      { seatCapacity, remainingSeats: seatCapacity - bookedSeats },
      { new: true }
    );

    if (!seating) {
      return res
        .status(404)
        .json({ message: "Seating not found for this event" });
    }

    res.status(200).json({ message: "Seating updated successfully", seating });
  } catch (error) {
    console.error("Error updating seating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
