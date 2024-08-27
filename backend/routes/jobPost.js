const express = require("express");

const { postJob, getJob } = require("../controllers/jobPost");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.get("/", getJob);
router.post("/", postJob);
module.exports = router;
