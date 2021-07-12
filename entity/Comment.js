const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Car",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
