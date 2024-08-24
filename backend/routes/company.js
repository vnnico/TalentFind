const express = require("express");

const {
  getCompany,
  validateCompany,
  registCompany,
  updateCompany,
} = require("../controllers/company");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();
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
