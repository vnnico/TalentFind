const Talent = require("../models/talent");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

const validateRegisterUser = (
  name,
  email,
  password,
  dob,
  gender,
  address,
  phoneNumber,
  role
) => {
  if (
    !name ||
    !email ||
    !password ||
    !dob ||
    !gender ||
    !address ||
    !phoneNumber ||
    !role
  ) {
    throw Error("All fields must be filled.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.");
  }
  // if (!validator.isDate(dob)) {
  //   throw Error("Date of Birth must be valid.");
  // }
  // if (!validator.isMobilePhone(phoneNumber)) {
  //   throw Error("Phone number is not valid.");
  // }
};

const validateRegister = async function (
  name,
  email,
  password,
  dob,
  gender,
  address,
  phoneNumber,
  role
) {
  try {
    validateRegisterUser(
      name,
      email,
      password,
      dob,
      gender,
      address,
      phoneNumber,
      role
    );
  } catch (error) {
    throw error;
  }

  const exist = await Talent.findOne({ email });
  if (exist) {
    // kalau exist (email ada), kasi error
    throw Error("Email already existed");
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
    role,
  });
  return user;
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await validateLogin(email, password);

    const token = createToken(user._id);

    // kalo mau tes dipostman, ganti aja object jsonnya
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, dob, gender, address, phoneNumber, role } =
    req.body;

  try {
    const user = await validateRegister(
      name,
      email,
      password,
      dob,
      gender,
      address,
      phoneNumber,
      role
    );
    const token = createToken(user._id);

    // kalo mau tes dipostman, ganti aja object jsonnya
    res
      .status(200)
      .json({ name, email, token, dob, gender, address, phoneNumber, role });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
