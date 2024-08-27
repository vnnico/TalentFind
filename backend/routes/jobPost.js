const express = require("express");

const {
  postJob,
  getAllJobPost,
  validatePostJob,
} = require("../controllers/jobPost");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.get("/", isAuth, checkRole("Recruiter"), getAllJobPost);
router.post("/", isAuth, checkRole("Recruiter"), validatePostJob, postJob);
module.exports = router;
