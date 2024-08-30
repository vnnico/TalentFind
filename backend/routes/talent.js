const express = require("express");
const {
  login,
  register,
  validateRegister,
  getProfile,
  validateUpdateProfile,
  updateProfile,
  logout,
} = require("../controllers/talent");

const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);

router.get("/profile", isAuth, getProfile);
router.put("/profile", isAuth, validateUpdateProfile, updateProfile);

router.post("/logout", logout);

module.exports = router;
