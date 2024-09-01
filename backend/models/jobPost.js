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
    require: true,
  },
  jobDescription: {
    type: String,
    require: true,
  },
  salary: {
    type: Number,
    require: true,
  },
});

const jobPost = mongoose.model("jobPost", jobPostSchemaa);
module.exports = jobPost;
