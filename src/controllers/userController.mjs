import Event from "../models/Event.mjs";
import EventSeating from "../models/EventSeating.mjs";
import Seating from "../models/Seating.mjs";

export const bookEvent = async (req, res) => {
  try {
    const { id, seatingId } = req.params;
    const { userId, seatCount, seatingType } = req.body;
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    const eventSeating = await EventSeating.findById(seatingId);
    if (!eventSeating) {
      return res
        .status(404)
        .json({ success: false, message: "Event seating not found" });
    }

    const bookingUser = await User.findById(userId);
    if (!bookingUser) {
      return res.status(404).json({ success: false, message: "No user found" });
    }
    if (seatCount <= 0 || seatCount > eventSeating.remainingSeats) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid seat count" });
    }
    const newBooking = new Seating({
      eventId: id,
      eventSeatingId: seatingId,
      userId,
      seatCount,
      seatingType,
    });
    await newBooking.save();
    eventSeating.remainingSeats -= seatCount;
    eventSeating.bookedSeats += seatCount;
    await eventSeating.save();
    res.status(201).json({
      success: true,
      message: "Event booked successfully",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookings = await Seating.find(userId)
      .populate("eventId")
      .populate("eventSeatingId")
      .populate("userId");
    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Seating.findById(id)
      .populate("eventId")
      .populate("eventSeatingId")
      .populate("userId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Seating.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    const eventSeating = await EventSeating.findById(booking.eventSeatingId);
    if (!eventSeating) {
      return res
        .status(404)
        .json({ success: false, message: "Event seating not found" });
    }
    eventSeating.remainingSeats += booking.seatCount;
    eventSeating.bookedSeats -= booking.seatCount;
    await eventSeating.save();

    const seating = Seating.findById(bookingId);
    if (!seating) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    booking.status = "cancelled";
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
