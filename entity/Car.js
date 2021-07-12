const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
  mark: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  immatriculation: {
    type: String,
    required: true,
    unique: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Car", CarSchema);
