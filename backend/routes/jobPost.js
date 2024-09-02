const express = require("express");

const {
  postJob,
  getAllJobPost,
  getPostedJob,
  validatePostJob,
  getJobPostByID,
  getApplicants,
  applyJob,
} = require("../controllers/jobPost");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

// talent
router.get("/", isAuth, checkRole("Talent"), getAllJobPost);
// router.get("/:id", isAuth, checkRole("Talent"), getJobPostByID);
router.post("/:jobPostID/apply", isAuth, checkRole("Talent"), applyJob);

// recruiter
router.get("/company", isAuth, checkRole("Recruiter"), getPostedJob);
router.post("/", isAuth, checkRole("Recruiter"), validatePostJob, postJob);

// Get Job Post Applicants
router.get("/:jobPostID/apply", isAuth, checkRole("Recruiter"), getApplicants);
module.exports = router;
