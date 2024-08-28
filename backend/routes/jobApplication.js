const express = require("express");
const {
  applyJob,
  getAllJob,
  getListApplicant,
} = require("../controllers/jobApplication");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

// talent
router.get("/", isAuth, checkRole("Talent"), getAllJob);
router.post("/", applyJob);

// recruiter
router.get("/company", isAuth, checkRole("Recruiter"), getListApplicant);

module.exports = router;
