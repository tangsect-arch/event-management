import mongoose from "mongoose";

const EventTableSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

EventTableSchema.index({ eventDate: 1, location: 1 }, { unique: true });

const Event = mongoose.model("Event", EventTableSchema);
export default Event;
