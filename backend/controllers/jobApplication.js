const Talent = require("../models/talent");
const jobPost = require("../models/jobPost");

const applyJob = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getAllJob = async (req, res) => {
  try {
    const listJob = await jobPost.find();
    if (!listJob) {
      return res.status(404).json({ msg: "There is no job " });
    }
    return res.status(200).json({ listJob });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  applyJob,
  getAllJob,
};
