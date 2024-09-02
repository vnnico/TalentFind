const Talent = require("../models/talent");
const JobPost = require("../models/jobPost");
const Company = require("../models/company");
const JobApplication = require("../models/jobApplication");

const { body, validationResult } = require("express-validator");

const getAllJobApplication = async (req, res) => {
  try {
    // const jobLists = await JobApplication.find({
    //   talentID: req.user._id,
    // }).populate({
    //   path: "jobPostID",
    //   populate: {
    //     path: "companyID",
    //     select: "name",
    //   },
    // });

    const jobLists = await JobApplication.aggregate([
      {
        $match: {
          talentID: req.user._id,
        },
      },
      {
        $lookup: {
          from: "jobposts",
          localField: "jobPostID",
          foreignField: "_id",
          as: "jobPostDetails",
        },
      },
      {
        $unwind: {
          path: "$jobPostDetails",
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "jobPostDetails.companyID",
          foreignField: "_id",
          as: "companyDetails",
        },
      },
      {
        $unwind: {
          path: "$companyDetails",
        },
      },
      {
        $project: {
          companyName: "$companyDetails.name",
          name: "$jobPostDetails.name",
          salary: "$jobPostDetails.salary",
          applicationDate: 1,
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

const getListApplicant = async (req, res) => {
  try {
    const recruiterID = req.user._id;

    const company = await Company.findOne({ recruiterID });
    if (!company) {
      // bisa lanjut buat redirect ke regist company
      return res.status(404).json({ message: "Company doesn't exists" });
    }

    const jobPost = await JobPost.find({ recruiterID });
    if (!jobPost) {
      return res.status(404).json({ message: "No job posted yet." });
    }

    const listApplicant = await JobApplication.find(jobPost._id);
    console.log(listApplicant);
    if (!listApplicant) {
      return res.status(400).json({ message: "There is no applicant yet." });
    }

    return res.status(200).json({ listApplicant });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllJobApplication,
  getListApplicant,
};
