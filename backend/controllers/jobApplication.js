const Talent = require("../models/talent");
const JobPost = require("../models/jobPost");
const Company = require("../models/company");
const JobApplication = require("../models/jobApplication");

const { body, validationResult } = require("express-validator");

const getAllJobApplication = async (req, res) => {
  try {
    const listJob = await JobApplication.find();
    if (!listJob) {
      return res.status(404).json({ msg: "There is no job " });
    }
    return res.status(200).json({ listJob });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getListApplicant = async (req, res) => {
  try {
    const recruiterID = req.user._id;

    const company = await Company.findOne({ recruiterID });
    if (!company) {
      // bisa lanjut buat redirect ke regist company
      return res.status(404).json({ msg: "Company doesn't exists" });
    }

    const jobPost = await JobPost.find({ recruiterID });
    if (!jobPost) {
      return res.status(404).json({ msg: "No job posted yet." });
    }

    const listApplicant = await JobApplication.find(jobPost._id);
    if (!listApplicant) {
      return res.status(400).json({ msg: "There is no applicant yet." });
    }

    return res.status(200).json({ listApplicant });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  getAllJobApplication,
  getListApplicant,
};
