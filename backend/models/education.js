const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  cvId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CV",
  },
  institution: {
    type: String,
    required: true,
  },
  GPA: {
    type: Number,
  },
  major: {
    type: String,
  },
  yearStart: {
    type: Date,
  },
  yearEnd: {
    type: Date,
  },
});

const Education = mongoose.model("Education", educationSchema);
module.exports = Education;
