const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  recruiterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },

  industry: {
    type: String,
    require: true,
    // add industry type
  },
  location: {
    type: String,
    require: true,
  },
  website: {
    type: String,
  },
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
