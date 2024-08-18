const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const talentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Talent", "Recruiter"],
    default: "Talent",
  },
});

// register
talentSchema.statics.register = async function (
  name,
  email,
  password,
  dob,
  gender,
  address,
  phoneNumber,
  role
) {
  // if (!email || !password) {
  //   throw Error("All fields must be filled.");
  // }

  const exist = await this.findOne({ email });
  if (exist) {
    // kalau exist (email ada), kasi error
    throw Error("Email already existed");
  }

  // hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password : hash,
    dob,
    gender,
    address,
    phoneNumber,
    role
  });
  return user;
};

// login
talentSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email });

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

const Talent = mongoose.model("Talent", talentSchema);
module.exports = Talent;
