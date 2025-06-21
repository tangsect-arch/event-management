import mongoose from "mongoose";

const SeatingTableSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventTable",
    required: true,
  },
  eventSeatingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventSeating",
    required: true,
  },
  seatCount: {
    type: Number,
    required: true,
    maxLimit: 5,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Seating = mongoose.model("Seating", SeatingTableSchema);
export default Seating;
