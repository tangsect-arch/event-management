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
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SeatingTableSchema.index({ eventId: 1, userId: 1 }, { unique: true });

const Seating = mongoose.model("Seating", SeatingTableSchema);
export default Seating;
