import Event from "../models/Event.mjs";
import EventSeating from "../models/EventSeating.mjs";
import Seating from "../models/Seating.mjs";

export const createEvent = async (req, res) => {
  try {
    const { eventName, eventDate, location, description } = req.body;
    const newEvent = new Event({
      eventName,
      eventDate: new Date(eventDate),
      location,
      description,
    });

    await newEvent.save().catch((error) => {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "Event with the same location and date already exists.",
        });
      }
      throw error;
    });

    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const events = await Event.find().skip(skip).limit(limit);
    const total = await Event.countDocuments();
    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: events,
      message: "Events fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({
      data: event,
      message: "Event fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventName, eventDate, location, description } = req.body;

    const event = await Event.findByIdAndUpdate(
      id,
      { eventName, eventDate, location, description },
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
    await EventSeating.deleteMany({ eventId: id });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEventSeating = async (req, res) => {
  try {
    const { seatingId } = req.params;
    const { seatCapacity } = req.body;

    const seating = await EventSeating.findByIdAndUpdate(
      { id: seatingId },
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

export const createEventSeating = async (req, res) => {
  try {
    const { eventId, seatCapacity, pricePerSeat } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const newSeating = new Seating({
      eventId: event._id,
      seatCapacity,
      remainingSeats: seatCapacity,
      pricePerSeat,
    });
    await newSeating.save();
    res.status(201).json({
      message: "Event seating created successfully",
      data: newSeating,
    });
  } catch (error) {
    console.error("Error creating event seating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventSeatingByEventId = async (req, res) => {
  try {
    const { id } = req.params;

    const eventSeating = await EventSeating.findMany({ eventId: id });

    if (!eventSeating) {
      return res.status(404).json({ message: "Seating not found" });
    }
    res.status(200).json({
      data: eventSeating,
      message: "Event seating fetched successfully",
    });
  } catch (error) {
    console.error("Error creating event seating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventSeatingBySeatingId = async (req, res) => {
  try {
    const { id, seatingId } = req.params;

    const evenSteating = await EventSeating.findById(seatingId);
    if (!evenSteating) {
      return res.status(404).json({ message: "Seating not found" });
    }
    res.status(200).json({
      data: evenSteating,
      message: "Event seating fetched successfully",
    });
  } catch (error) {
    console.error("Error creating event seating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
