const express = require("express");
const { applyJob } = require("../controllers/jobApplication");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.post("/application", applyJob);

module.exports = router;
