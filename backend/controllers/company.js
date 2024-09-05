const Company = require("../models/company");
const { body, validationResult } = require("express-validator");

const getCompany = async (req, res) => {
  const recruiterID = req.user._id;

  const company = await Company.findOne({ recruiterID });
  if (!company) {
    // bisa lanjut buat redirect ke regist company
    return res.status(404).json({ message: "Company doesn't exists" });
  }

  try {
    return res.status(200).json(company);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
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
    return res.status(400).json({ message: "Email already existed" });
  }
  const recruiterID = req.user._id;
  try {
    const newCompany = await Company.create({ ...data, recruiterID });
    return res.status(200).json({ message: "Register company success" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to register company" });
  }
};

const validateUpdateCompany = [
  body("name").notEmpty().withMessage("Company name is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("description").notEmpty().withMessage("Company description is required"),
  body("industry").notEmpty().withMessage("Company industry type is required"),
];

const updateCompany = async (req, res) => {
  const recruiterID = req.user._id;
  console.log(recruiterID);

  const company = await Company.findOne({ recruiterID: recruiterID });
  try {
    if (company) {
      console.log(company);
      const checkError = validationResult(req);
      if (!checkError.isEmpty()) {
        return res.status(404).json({ errors: checkError.array() });
      }

      // const updatedCompany = await Company.findOneAndUpdate(
      //   recruiterID,
      //   { ...req.body },
      //   { returnDocument: "after" }
      // );

      const updatedCompany = await Company.findOneAndUpdate(
        { recruiterID: recruiterID },
        {
          name: req.body.name,
          email: req.body.email,
          description: req.body.description,
          industry: req.body.industry,
          location: req.body.location,
          website: req.body.website,
        },
        { new: true }
      );
      console.log("CUPDA: ", updatedCompany);
      if (updatedCompany) {
        return res
          .status(200)
          .json({ updatedCompany, message: "Update Company Success" });
      }
      return res.status(404).json({ message: "Company doesn't exist" });
    } else if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getCompany,
  validateCompany,
  registCompany,
  validateUpdateCompany,
  updateCompany,
};
