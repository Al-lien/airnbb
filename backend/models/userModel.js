const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  ispro: {
    type: Boolean,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function signingup(
  email,
  password,
  lastname,
  firstname,
  address,
  phone,
  ispro
) {
  // validation
  if (!email || !password || !lastname || !firstname || !address || !phone) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // Default options : { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    lastname,
    firstname,
    address,
    phone,
    ispro,
  });

  return user;
};

userSchema.statics.login = async function logingin(email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  // compare input password and stored password
  const match = await bcrypt.compare(password, user.password);

  // FOR LATER : must check is user's pro or not !

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
