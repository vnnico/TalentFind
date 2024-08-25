const express = require("express");

const {
  getCompany,
  validateCompany,
  registCompany,
  validateUpdateCompany,
  updateCompany,
} = require("../controllers/company");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();
// company
router.get("/", isAuth, checkRole("Recruiter"), getCompany);
router.post(
  "/",
  isAuth,
  checkRole("Recruiter"),
  validateCompany,
  registCompany
);
router.put(
  "/",
  isAuth,
  checkRole("Recruiter"),
  validateUpdateCompany,
  updateCompany
);

module.exports = router;
