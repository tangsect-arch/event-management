import Event from "../models/Event.mjs";
import EventSeating from "../models/EventSeating.mjs";

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
      logger.error(error);
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
    logger.error(error);
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
        return res.status(400).json({
          success: false,
          error: "from date cannot be after to date.",
        });
      }
    } else if (fromDate && !toDate) {
      return res
        .status(400)
        .json({ success: false, error: "to date is required." });
    } else if (!fromDate && toDate) {
      return res
        .status(400)
        .json({ success: false, error: "from date is required." });
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
      .sort({ eventDate: 1 })
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
    logger.error(error);
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
    logger.error(error);
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
    logger.error(error);
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
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateEventSeating = async (req, res) => {
  try {
    const { seatingId } = req.params;
    const { seatCapacity, pricePerSeat } = req.body;
    let eventSeating = await EventSeating.findById(seatingId);

    if (!eventSeating) {
      return res
        .status(404)
        .json({ success: false, message: "Seating not found" });
    }

    eventSeating.pricePerSeat = pricePerSeat;
    eventSeating.seatCapacity = seatCapacity;
    eventSeating.remainingSeats = seatCapacity - eventSeating.bookedSeats;
    eventSeating = await eventSeating.save();

    res.status(200).json({
      success: true,
      message: "Seating updated successfully",
      eventSeating,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createEventSeating = async (req, res) => {
  try {
    const { id } = req.params;
    const { seatCapacity, pricePerSeat, seatingType } = req.body;
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    const input = {
      eventId: id,
      seatingType,
      seatCapacity,
      remainingSeats: seatCapacity,
      pricePerSeat,
    };
    const newEventSeating = new EventSeating(input);
    await newEventSeating.save().catch((error) => {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Event seating already exist",
        });
      }
    });
    res.status(201).json({
      success: true,
      message: "Event seating created successfully",
      data: newEventSeating,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getEventSeatingByEventId = async (req, res) => {
  try {
    const { id } = req.params;
    const eventSeating = await EventSeating.find({ eventId: id });

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
    logger.error(error);
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
    logger.error(error);
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

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filter = {};
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      if (isNaN(from) || isNaN(to)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid date format" });
      }

      if (from > to) {
        return res.status(400).json({
          success: false,
          message: "From date cannot be after To date.",
        });
      }

      filter.eventDate = {
        $gte: from < today ? today : from,
        $lte: to,
      };
    } else if (fromDate && !toDate) {
      const from = new Date(fromDate);
      if (isNaN(from)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid fromDate" });
      }
      filter.eventDate = { $gte: from < today ? today : from };
    } else if (!fromDate && !toDate) {
      filter.eventDate = { $gte: today };
    }

    if (name) {
      filter.eventName = { $regex: name, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const events = await Event.find(filter)
      .sort({ eventDate: 1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Event.countDocuments(filter);

    if (events.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No events found" });
    }

    return res.status(200).json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalRecords: total,
      data: events,
      message: "Events fetched successfully",
    });
  } catch (error) {
    logger.error(error);
    console.error("eventLists error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
