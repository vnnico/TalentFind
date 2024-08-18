const talent = require("../models/talent");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.HASH, { expiresIn: "2d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await talent.login(email, password);

    const token = createToken(user._id);

    // kalo mau tes dipostman, ganti aja object jsonnya
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const register = async (req, res) => {
  const { name, email, password, dob, gender, address, phoneNumber, role } =
    req.body;

  try {
    const user = await talent.register(
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
  login,
  register,
};
