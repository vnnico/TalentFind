const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  jobPostID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobPost",
  },
  talentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Talent",
  },
  applicationDate: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  applicationAttachment: {
    type: File,
  },
});

const jobApplication = mongoose.model("jobApplication", jobApplicationSchema);
module.exports(jobApplication);
