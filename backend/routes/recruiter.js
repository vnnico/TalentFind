const express = require("express");
const {
  login,
  register,
  validateRegister,
  getProfile,
  validateUpdateProfile,
  updateProfile,
  findRecommendedTalent,
} = require("../controllers/recruiter");

const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);

router.get("/profile", isAuth, getProfile);
router.post("/hire", isAuth, checkRole("Recruiter"), findRecommendedTalent);

router.put("/profile", isAuth, validateUpdateProfile, updateProfile);

module.exports = router;
