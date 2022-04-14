const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  location: { type: String },
  availableUnits: { type: String },
  progress: { type: String },
  delivery: { type: String },
  paymentPlan: { type: String },
  description: { type: String },
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("Post", itemSchema);
