const express = require("express");
const {
  login,
  register,
  validateRegister,
  getProfile,
  validateUpdateProfile,
  updateProfile,
} = require("../controllers/talent");

const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);

router.get("/profile", getProfile);
router.put("/profile", isAuth, validateUpdateProfile, updateProfile);

module.exports = router;
