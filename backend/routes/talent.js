const express = require("express");
const {
  login,
  register,
  validateRegister,
  getProfile,
  validateUpdateProfile,
  updateProfile,
  logout,
  validateToken,
  getAllTalents,
} = require("../controllers/talent");

const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);

router.get("/", isAuth, getAllTalents);
router.get("/profile", isAuth, getProfile);
router.put("/profile", isAuth, validateUpdateProfile, updateProfile);

router.post("/logout", logout);
router.get("/validate-token", isAuth, validateToken);

module.exports = router;
