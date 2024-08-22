const express = require("express");
const {
  login,
  register,
  validateRegister,
  getProfile,
} = require("../controllers/talent");

const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);

router.get("/profile", isAuth, getProfile);

module.exports = router;
