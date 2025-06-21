import mongoose from "mongoose";

const EventSeatingTableSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventTable",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seatCapacity: {
    type: Number,
    required: true,
    min: 1,
  },
  remainingSeats: {
    type: Number,
    required: true,
    min: 0,
  },
  bookedSeats: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

const EventSeating = mongoose.model("EventSeating", EventSeatingTableSchema);
export default EventSeating;
