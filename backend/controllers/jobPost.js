const Company = require("../models/company");
const JobPost = require("../models/jobPost");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const JobApplication = require("../models/jobApplication");

const getAllJobPost = async (req, res) => {
  try {
    // const listJob = await JobPost.find().populate("companyID", "name");

    const jobLists = await JobPost.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "companyID",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $project: {
          companyName: "$company.name",
          name: 1,
          salary: 1,
        },
      },
    ]);

    if (!jobLists) {
      return res.status(404).json({ message: "There is no job " });
    }

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
    const recruiterID = req.user.id;
    const company = await Company.findOne({ recruiterID: recruiterID });

    if (!company) {
      return res.status(404).json({ message: "Please create a company first" });
    }

    const data = req.body;
    //
    const newJobPost = await JobPost.create({
      recruiterID,
      companyID: company._id,
      name: data.name,
      salary: data.salary,
      jobDescription: data.description,
    });

    return res.status(200).json({ newJobPost, message: "Posting Job Success" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getPostedJob = async (req, res) => {
  try {
    const recruiterID = req.user._id;

    const jobLists = await JobPost.aggregate([
      {
        $lookup: {
          from: "jobapplications",
          localField: "_id",
          foreignField: "jobPostID",
          as: "applications",
        },
      },
      {
        $addFields: {
          totalApplicants: { $size: "$applications" },
        },
      },
      {
        $match: {
          recruiterID: new mongoose.Types.ObjectId(recruiterID),
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "companyID",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $project: {
          _id: "$_id",
          name: "$name",
          salary: "$salary",
          companyName: "$company.name",
          totalApplicants: 1,
        },
      },
    ]);

    if (!jobLists) {
      return res.status(404).json({ message: "No job posted yet." });
    }

    return res.status(200).json({ jobLists });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
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
    const data = "default";
    const talentID = req.user._id;
    const { jobPostID } = req.params;
    const jobPost = await JobPost.findById(jobPostID);
    if (!jobPost) {
      return res.status(404).json({ message: "No such job posted yet." });
    }
    const applyJobPost = await JobApplication.create({
      jobPostID,
      talentID,
      ...data,
    });
    console.log(applyJobPost);
    return res.status(200).json({ message: "Apply Success", applyJobPost });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getApplicants = async (req, res) => {
  try {
    const { jobPostID } = req.params;
    const jobPost = await JobPost.findById(jobPostID);
    if (!jobPost)
      return res.status(404).json({ message: "Job Post not found" });

    const applicantLists = await JobApplication.aggregate([
      {
        $match: {
          jobPostID: new mongoose.Types.ObjectId(jobPostID),
        },
      },
      {
        $lookup: {
          from: "talents",
          localField: "talentID",
          foreignField: "_id",
          as: "talent",
        },
      },
      {
        $unwind: "$talent",
      },
      {
        $lookup: {
          from: "jobposts",
          localField: "jobPostID",
          foreignField: "_id",
          as: "jobPost",
        },
      },
      {
        $unwind: "$jobPost",
      },
      {
        $project: {
          _id: 0,
          name: "$talent.name",
          email: "$talent.email",
          gender: "$talent.gender",
          applicationDate: 1,
        },
      },
    ]);

    return res.status(200).json({
      applicantLists,
      jobPostName: jobPost.name,
      totalApplicants: applicantLists.length,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  getAllJobPost,
  getApplicants,
  validatePostJob,
  postJob,
  getPostedJob,
  getJobPostByID,
  applyJob,
};
