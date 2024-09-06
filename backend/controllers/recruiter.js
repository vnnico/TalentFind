const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const Recruiter = require("../models/recruiter");
const { zipFolder } = require("../utils/zipFile");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const Talent = require("../models/talent");

const createToken = (_id, role) => {
  return jwt.sign({ id: _id, role: role }, process.env.HASH, {
    expiresIn: "2d",
  });
};

const validateLogin = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await Recruiter.findOne({ email });

  // kalo email user ngga ada, kasi error
  if (!user) {
    throw Error("Email does not exist.");
  }

  // bandingin password yang diinput dengan password yang ada di database
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    // kalo error, berarti passwordnya beda
    throw Error("Invalid login credentials.");
  }

  return user;
};

const validateRegister = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be atleast 2 character long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long"),

  body("dob")
    .notEmpty()
    .withMessage("Date of Birth is required")
    .trim()
    .isDate()
    .withMessage(
      "Date of Birth must be valid and must be in YYYY-MM-DD format"
    ),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be either Male or Female"),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 3 })
    .withMessage("Address must be at least 3 characters long"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Phone number is not valid"),
];

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await validateLogin(email, password);

    const token = createToken(user._id, user.role);
    res.cookie("auth_token", token, {
      maxAge: 2 * 86400000,
    });

    // kalo mau tes dipostman, ganti aja object jsonnya
    res.status(200).json({
      recruiterId: user._id,
      token,
      role: user.role,
      message: "Login Success",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const register = async (req, res) => {
  const checkError = validationResult(req);
  if (!checkError.isEmpty()) {
    return res.status(400).json({ errors: checkError.array() });
  }

  const { name, email, password, dob, gender, address, phoneNumber } = req.body;

  const exist = await Recruiter.findOne({ email });
  if (exist) {
    // kalau exist (email ada), kasi error
    return res.status(400).json({ message: "Email already existed" });
  }

  // hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await Recruiter.create({
    name,
    email,
    password: hash,
    dob,
    gender,
    address,
    phoneNumber,
  });

  const token = createToken(user._id, user.role);

  res.cookie("auth_token", token, {
    maxAge: 2 * 86400000,
  });
  try {
    // kalo mau tes dipostman, ganti aja object jsonnya
    res.status(200).json({ message: "Register Success" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.user;
    const user = await Recruiter.findById(id);
    if (user) {
      // all logics here
      return res.status(200).json({ user });
    } else if (!user) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const validateUpdateProfile = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be atleast 2 character long"),

  body("dob")
    .notEmpty()
    .withMessage("Date of Birth is required")
    .trim()
    .isDate()
    .withMessage(
      "Date of Birth must be valid and must be in YYYY-MM-DD format"
    ),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be either Male or Female"),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 3 })
    .withMessage("Address must be at least 3 characters long"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Phone number is not valid"),
];

const updateProfile = async (req, res) => {
  const _id = req.user;
  const user = await Recruiter.findById(_id);
  try {
    if (user) {
      const checkError = validationResult(req);
      if (!checkError.isEmpty()) {
        return res.status(404).json({ errors: checkError.array() });
      }
      // passed validate
      const updatedUser = await Recruiter.findOneAndUpdate(
        { _id },
        { ...req.body },
        { returnDocument: "after" }
      );

      if (updatedUser) {
        return res.status(200).json({ updatedUser });
      }
      return res.status(404).json({ msg: "User doesn't exist" });
    } else if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const findRecommendedTalent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const recruiterID = req.user.id;
    const recruiter = await Recruiter.findById(recruiterID);
    if (!recruiter)
      return res.status(404).json({ message: "Recruiter not found" });

    let folderPath;
    let zipFilePath;
    try {
      folderPath = path.join(__dirname, "../../files");
      zipFilePath = path.join(__dirname, "../../files.zip");
      await zipFolder(folderPath, zipFilePath);
    } catch (error) {
      return res.status(500).message({ message: "Failed to convert into zip" });
    } finally {
    }

    const formData = new FormData();
    formData.append("file", fs.createReadStream(zipFilePath));
    formData.append("job_description", prompt);

    let responseBody;
    try {
      console.log("kalau ini");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/process",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );
      console.log("dalem fetch");
      responseBody = response.data;
      console.log(responseBody);
    } catch (error) {
      if (error.response) {
        console.log("hi");
        return res
          .status(error.response.status)
          .json({ message: error.response.data });
      } else {
        return res
          .status(500)
          .json({ message: "Request error", error: error.message });
      }
    } finally {
      if (zipFilePath) fs.unlinkSync(zipFilePath);
    }

    // const example = [
    //   {
    //     CV_File: "1725556682968.pdf",
    //     Similarity_Score: 60.13312339782715,
    //   },
    //   {
    //     CV_File: "1725556974877.pdf",
    //     Similarity_Score: 59.31735634803772,
    //   },
    //   {
    //     CV_File: "1725553221738.pdf",
    //     Similarity_Score: 59.17598605155945,
    //   },
    // ];

    const allTalents = await Talent.find({});

    const recommendedTalents = responseBody
      .map((result) => {
        const matchedTalent = allTalents.find(
          (talent) => talent.cvFile === result.CV_File
        );

        if (matchedTalent) {
          return {
            talent: matchedTalent,
            similarityScore: Math.round(result.Similarity_Score * 100) / 100,
          };
        }
      })
      .filter(Boolean); // Filter out undefined values (if no match is found)

    return res.status(200).json({
      recommendedTalents,
      message: "Get Recommendation Talent Success",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  login,
  register,
  validateRegister,
  getProfile,
  validateUpdateProfile,
  updateProfile,
  findRecommendedTalent,
};
