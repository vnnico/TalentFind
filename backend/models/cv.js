const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  talentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Talent",
  },
  description: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],
});

const CV = mongoose.model("CV", cvSchema);
module.exports = CV;
