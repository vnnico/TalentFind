const Company = require("../models/company");
const jobPost = require("../models/jobPost");
const JobPost = require("../models/jobPost");
const { body, validationResult } = require("express-validator");

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
    const newJobPost = await jobPost.create({
      recruiterID,
      companyID: company._id,
      ...data,
    });

    return res.status(200).json(newJobPost);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getAllJobPost = async (req, res) => {
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

module.exports = {
  validatePostJob,
  postJob,
  getAllJobPost,
};
