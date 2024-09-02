const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  recruiterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  industry: {
    type: String,
    required: true,
    // add industry type
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
