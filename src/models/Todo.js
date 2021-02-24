import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Todo", todoSchema);
