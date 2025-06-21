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
  seatingType: {
    type: String,
    required: true,
    enum: ["VIP", "Regular", "Economy"],
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
  pricePerSeat: {
    type: Number,
    required: true,
    min: 0,
  },
});

EventSeatingTableSchema.index({ eventId: 1, seatingType: 1 }, { unique: true });

const EventSeating = mongoose.model("EventSeating", EventSeatingTableSchema);
export default EventSeating;
