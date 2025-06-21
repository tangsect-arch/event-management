import Event from "../models/Event.mjs";
import EventSeating from "../models/EventSeating.mjs";
import Seating from "../models/Seating.mjs";

export const bookEvent = async (req, res) => {
  try {
    const { eventId, eventSeatingId } = req.params;
    const { userId, seatCount, seatingType } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const eventSeating = await EventSeating.findById(eventSeatingId);
    if (!eventSeating) {
      return res.status(404).json({ message: "Event seating not found" });
    }

    const bookingUser = await User.findById(userId);
    if (!bookingUser) {
      return res.status(404).json({ message: "No user found" });
    }
    if (seatCount <= 0 || seatCount > eventSeating.remainingSeats) {
      return res.status(400).json({ message: "Invalid seat count" });
    }
    const newBooking = new Seating({
      eventId,
      eventSeatingId,
      userId,
      seatCount,
      seatingType,
    });
    await newBooking.save();
  } catch (error) {
    console.error("Error booking event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const { eventId, eventSeatingId } = req.params;
    const { userId, seatCount, seatingType } = req.body;
    const bookings = await Seating.find(userId)
      .populate("eventId")
      .populate("eventSeatingId")
      .populate("userId");
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
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
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Seating.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const eventSeating = await EventSeating.findById(booking.eventSeatingId);
    if (!eventSeating) {
      return res.status(404).json({ message: "Event seating not found" });
    }
    eventSeating.remainingSeats += booking.seatCount;
    eventSeating.bookedSeats -= booking.seatCount;
    await eventSeating.save();
    await Seating.findByIdAndDelete(id);

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
