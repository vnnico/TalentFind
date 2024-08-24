const express = require("express");
const {
  login,
  register,
  validateRegister,
  getProfile,
  validateUpdateProfile,
  updateProfile,
} = require("../controllers/recruiter");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);

router.get("/profile", isAuth, getProfile);
router.put("/profile", isAuth, validateUpdateProfile, updateProfile);

module.exports = router;
