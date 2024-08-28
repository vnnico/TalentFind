const express = require("express");
const {
  getAllJobApplication,
  getListApplicant,
} = require("../controllers/jobApplication");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

// talent
router.get("/", isAuth, checkRole("Talent"), getAllJobApplication);

// recruiter
router.get("/company", isAuth, checkRole("Recruiter"), getListApplicant);

module.exports = router;
