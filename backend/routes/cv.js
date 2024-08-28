const express = require("express");
const router = express.Router();
const cvControllers = require("../controllers/cv");
const isAuth = require("../middleware/isAuth");

router.post("/", cvControllers.createCV);

module.exports = router;
