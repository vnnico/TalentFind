const Talent = require("../models/talent");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.HASH, { expiresIn: "2d" });
};

const validateLogin = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await Talent.findOne({ email });

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

    const token = createToken(user._id);

    // kalo mau tes dipostman, ganti aja object jsonnya
    res.status(200).json({
      talentId: user._id,
      token,
      message: "Login Success",
      role: user.role,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const checkError = validationResult(req);
    if (!checkError.isEmpty()) {
      return res.status(400).json({ errors: checkError.array() });
    }

    const { name, email, password, dob, gender, address, phoneNumber } =
      req.body;

    const exist = await Talent.findOne({ email });
    if (exist) {
      // kalau exist (email ada), kasi error
      return res.status(400).json({ message: "Email already existed" });
    }

    // hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await Talent.create({
      name,
      email,
      password: hash,
      dob,
      gender,
      address,
      phoneNumber,
    });

    const token = createToken(user._id);
    // kalo mau tes dipostman, ganti aja object jsonnya
    res.status(200).json({
      talentId: user._id,
      token,
      message: "Register Success",
      role: user.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register", error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const id = "66cc3e4fa9b92381a46c681a";
    const user = await Talent.findById(id);
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
  const user = await Talent.findById(_id);
  try {
    if (user) {
      const checkError = validationResult(req);
      if (!checkError.isEmpty()) {
        return res.status(404).json({ errors: checkError.array() });
      }
      // passed validate
      const updatedUser = await Talent.findOneAndUpdate(
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

module.exports = {
  login,
  register,
  validateRegister,
  getProfile,
  validateUpdateProfile,
  updateProfile,
};
