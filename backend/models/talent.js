const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Talent",
  },
  cvFile: {
    type: String,
  },
  cvLink: {
    type: String,
  },
  jobRecommendation: [
    {
      type: String,
    },
  ],
});

const Talent = mongoose.model("Talent", talentSchema);
module.exports = Talent;
