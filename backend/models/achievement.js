const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  cvId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CV",
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  issuingBy: {
    type: String,
    required: true,
  },
});

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
