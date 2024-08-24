const express = require("express");
const {
  login,
  register,
  validateRegister,
  getProfile,
  validateUpdateProfile,
  updateProfile,
  getCompany,
  validateCompany,
  registCompany,
  updateCompany,
} = require("../controllers/recruiter");

const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);

router.get("/profile", isAuth, getProfile);
router.put("/profile", isAuth, validateUpdateProfile, updateProfile);

// company
router.get("/", isAuth, getCompany);
router.post(
  "/",
  isAuth,
  checkRole("Recruiter"),
  validateCompany,
  registCompany
);
router.put("/", isAuth, updateCompany);

module.exports = router;
