const Company = require("../models/company");
const { body, validationResult } = require("express-validator");

const getCompany = async (req, res) => {
  const recruiterID = req.user._id;

  const company = await Company.findOne({ recruiterID });
  if (!company) {
    // bisa lanjut buat redirect ke regist company
    return res.status(404).json({ msg: "Company doesn't exists" });
  }

  try {
    return res.status(200).json(company);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const validateCompany = [
  body("name").notEmpty().withMessage("Company name is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),

  body("location").notEmpty().withMessage("Location is required"),
  body("description").notEmpty().withMessage("Company description is required"),
  body("industry").notEmpty().withMessage("Company industry type is required"),
];

const registCompany = async (req, res) => {
  const checkError = validationResult(req);
  if (!checkError.isEmpty()) {
    return res.status(404).json({ errors: checkError.array() });
  }
  const data = req.body;
  // check if company exists
  const exist = await Company.findOne({ email: data.email });
  if (exist) {
    // kalau exist (email ada), kasi error
    return res.status(400).json({ errors: "Email already existed" });
  }
  const recruiterID = req.user._id;
  try {
    const newCompany = await Company.create({ ...data, recruiterID });
    return res.status(200).json(newCompany);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const validateUpdateCompany = [
  body("name").notEmpty().withMessage("Company name is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("description").notEmpty().withMessage("Company description is required"),
  body("industry").notEmpty().withMessage("Company industry type is required"),
];

const updateCompany = async (req, res) => {
  const recruiterID = req.user_id;

  const company = await Company.findOne(recruiterID);
  try {
    if (company) {
      const checkError = validationResult(req);
      if (!checkError.isEmpty()) {
        return res.status(404).json({ errors: checkError.array() });
      }

      const updatedCompany = await Company.findOneAndUpdate(
        recruiterID,
        { ...req.body },
        { returnDocument: "after" }
      );
      console.log("CUPDA: ", updatedCompany);
      if (updatedCompany) {
        return res.status(200).json({ updatedCompany });
      }
      return res.status(404).json({ msg: "Company doesn't exist" });
    } else if (!company) {
      return res.status(404).json({ msg: "Company not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  getCompany,
  validateCompany,
  registCompany,
  validateUpdateCompany,
  updateCompany,
};
