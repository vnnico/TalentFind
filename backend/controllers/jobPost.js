const Company = require("../models/company");
const JobPost = require("../models/jobPost");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const JobApplication = require("../models/jobApplication");

const getAllJobPost = async (req, res) => {
  try {
    const listJob = await JobPost.find().populate("companyID", "name");
    if (!listJob) {
      return res.status(404).json({ message: "There is no job " });
    }

    const jobLists = listJob;
    return res.status(200).json({ jobLists });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const postJob = async (req, res) => {
  try {
    const checkError = validationResult(req);
    if (!checkError.isEmpty()) {
      return res.status(404).json({ errors: checkError.array() });
    }
    // check if company exist
    const recruiterID = req.user._id;
    const company = await Company.findOne({ recruiterID });

    if (!company) {
      return res.status(404).json({ msg: "Please create a company first" });
    }

    const data = req.body;
    const newJobPost = await JobPost.create({
      recruiterID,
      companyID: company._id,
      ...data,
    });

    return res.status(200).json(newJobPost);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getPostedJob = async (req, res) => {
  try {
    const recruiterID = req.user._id;

    const jobPost = await JobPost.find({ recruiterID });
    if (!jobPost) {
      return res.status(404).json({ msg: "No job posted yet." });
    }

    return res.status(200).json(jobPost);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const validatePostJob = [
  body("name").notEmpty().withMessage("Job name cannot be empty"),
  body("description").notEmpty().withMessage("Job description cannot be empty"),
  body("salary").notEmpty().withMessage("Salary cannot be empty"),
];

const getJobPostByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "ID isn't valid" });
    }
    const findJobPost = await JobPost.findById(id);
    if (!findJobPost) {
      return res.status(404).json({ msg: "No such job" });
    }
    return res.status(200).json({ findJobPost });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const applyJob = async (req, res) => {
  try {
    const data = req.body;
    const talentID = req.user._id;
    const { jobPostID } = req.params;
    const jobPost = await JobPost.findById(jobPostID);
    if (!jobPost) {
      return res.status(404).json({ msg: "No such job posted yet." });
    }
    const applyJobPost = await JobApplication.create({
      jobPostID,
      talentID,
      ...data,
    });
    return res.status(200).json({ applyJobPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  getAllJobPost,
  validatePostJob,
  postJob,
  getPostedJob,
  getJobPostByID,
  applyJob,
};
