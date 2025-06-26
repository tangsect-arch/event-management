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
          success: false,
          message: "Event with the same location and date already exists.",
        });
      }
    });

    res
      .status(201)
      .json({ success: true, message: "Event created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const {
      name,
      fromDate,
      toDate,
      location,
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (page - 1) * limit;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let from, to;

    if (fromDate && toDate) {
      from = new Date(fromDate);
      to = new Date(toDate);

      if (from > to) {
        return res
          .status(400)
          .json({ error: "from date cannot be after to date." });
      }
    } else if (fromDate && !toDate) {
      return res.status(400).json({ error: "to date is required." });
    } else if (!fromDate && toDate) {
      return res.status(400).json({ error: "from date is required." });
    }
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (from && to) {
      filter.date = { $gte: from, $lte: to };
    }

    const events = await Event.find(filter)
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Event.countDocuments(filter);

    if (events.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No events found" });
    }
    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: events,
      message: "Events fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
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
      success: true,
      data: event,
      message: "Event fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
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
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    await EventSeating.deleteMany({ eventId: id });

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
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
        .json({ success: false, message: "Seating not found for this event" });
    }

    res.status(200).json({
      success: true,
      message: "Seating updated successfully",
      seating,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createEventSeating = async (req, res) => {
  try {
    const { eventId, seatCapacity, pricePerSeat } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    const newSeating = new Seating({
      eventId: event._id,
      seatCapacity,
      remainingSeats: seatCapacity,
      pricePerSeat,
    });
    await newSeating.save();
    res.status(201).json({
      success: true,
      message: "Event seating created successfully",
      data: newSeating,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getEventSeatingByEventId = async (req, res) => {
  try {
    const { id } = req.params;

    const eventSeating = await EventSeating.findMany({ eventId: id });

    if (!eventSeating) {
      return res
        .status(404)
        .json({ success: false, message: "Seating not found" });
    }
    res.status(200).json({
      success: true,
      data: eventSeating,
      message: "Event seating fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventSeatingBySeatingId = async (req, res) => {
  try {
    const { id, seatingId } = req.params;

    const evenSteating = await EventSeating.findById(seatingId);
    if (!evenSteating) {
      return res
        .status(404)
        .json({ success: false, message: "Seating not found" });
    }
    res.status(200).json({
      data: evenSteating,
      success: true,
      message: "Event seating fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const eventLists = async (req, res) => {
  try {
    const {
      name,
      fromDate,
      toDate,
      location,
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (page - 1) * limit;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let from, to;

    if (fromDate && toDate) {
      from = new Date(fromDate);
      to = new Date(toDate);

      if (from > to) {
        return res
          .status(400)
          .json({ error: "from date cannot be after to date." });
      }
    } else if (fromDate && !toDate) {
    } else if (!fromDate && toDate) {
    }
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    filter.date = { $gte: from, $lte: to };

    const events = await Event.find(filter)
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Event.countDocuments(filter);

    if (events.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No events found" });
    }
    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: events,
      message: "Events fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
