const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  cvId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CV",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  issuingBy: {
    type: String,
    required: true,
  },
});

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
