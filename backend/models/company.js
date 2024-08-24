const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  recruiterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
  },
  name: {
    type: string,
    require: true,
  },
  email: {
    type: string,
    require: true,
  },
  description: {
    type: string,
    require: true,
  },

  industry: {
    type: string,
    require: true,
    // add industry type
  },
  location: {
    type: string,
    require: true,
  },
  website: {
    type: string,
  },
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
