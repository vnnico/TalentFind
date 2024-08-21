const express = require("express");
const { login, register, validateRegister } = require("../controllers/talent");

const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);

module.exports = router;
