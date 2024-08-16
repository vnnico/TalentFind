const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  cvId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CV",
  },
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  yearStart: {
    type: Date,
  },
  yearEnd: {
    type: Date,
  },
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
