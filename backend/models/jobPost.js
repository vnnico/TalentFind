const mongoose = require("mongoose");

const jobPostSchemaa = new mongoose.Schema({
  companyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  jobDescription: {
    type: String,
    require: true,
  },
  salary: {
    type: Int32Array,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const jobPost = mongoose.model("jobPost", jobPostSchemaa);
module.exports = jobPost;
