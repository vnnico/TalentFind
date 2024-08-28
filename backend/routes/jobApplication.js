const express = require("express");
const { applyJob, getAllJob } = require("../controllers/jobApplication");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.post("/", applyJob);
router.get("/", getAllJob);

module.exports = router;
