const mongoose = require("mongoose");

const jobPostSchemaa = new mongoose.Schema({
  companyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  recruiterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
  },
  name: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const jobPost = mongoose.model("jobPost", jobPostSchemaa);
module.exports = jobPost;
