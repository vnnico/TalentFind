const express = require("express");
const router = express.Router();
const cvControllers = require("../controllers/cv");
const isAuth = require("../middleware/isAuth");
const upload = require("../middleware/multer");

router.post("/", isAuth, cvControllers.createCV);
router.post("/analyze", isAuth, upload.single("file"), cvControllers.analyzeCV);
router.get("/", isAuth, cvControllers.getCV);

module.exports = router;
