const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

// GET ALL users
const getAllData = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

// GET SINGLE user
const getSingleData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  return res.status(200).json(user);
};

// LOGIN user
const loginUser = async (req, res) => {
  // FOR LATER : must check is user's pro or not !
  const { email, password } = req.body;

  try {
    // FOR LATER : must check is user's pro or not !
    const user = await User.login(email, password);

    // create jwt
    const token = createToken(user._id);

    res.status(200).json({ id: user._id, token, ispro: user.ispro });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// SIGNUP user
const signupUser = async (req, res) => {
  const { email, password, lastname, firstname, address, phone, ispro } =
    req.body;

  try {
    const user = await User.signup(
      email,
      password,
      lastname,
      firstname,
      address,
      phone,
      ispro
    );

    // create jwt
    const token = createToken(user._id);

    res.status(200).json({ id: user._id, token, ispro: user.ispro });
  } catch (error) {
    console.info(req.body);
    res.status(400).json({ error: error.message });
  }
};

// UPDATE user
const updateData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  return res.status(200).json(user);
};

// DELETE user
const deleteData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  return res.status(200).json({ message: `user ${id} deleted` });
};

module.exports = {
  getAllData,
  getSingleData,
  loginUser,
  signupUser,
  updateData,
  deleteData,
};
