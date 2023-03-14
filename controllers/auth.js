const Auth = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// creating registration paths
const SignUp = async (req, res) => {
  const { username, phone_number, password, confirmPassword } = req.body;
  try {
    // checking if user already exists
    var existingUser = await Auth.findOne({ username });
    console.log("here");
    if (existingUser)
      return res.status(400).json({ message: "user already exists" });
    // checking if password match
    if (password !== confirmPassword)
      return res.status(400).json({ message: "passwords don't match" });
    //hashing the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // creating user
    const newUser = new Auth({
      username,
      phone_number,
      password: hashedPassword,
    });
    await newUser.save();
    // generating tokens
    const access = jwt.sign(
      {
        _id: newUser._id,
        username: newUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10d",
      }
    );
    // creating refresh token
    const refresh = jwt.sign(
      {
        _id: newUser._id,
        username: newUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10d",
      }
    );
    res.status(200).json({ access, refresh });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// signing in route
// sign in
const SignIn = async (req, res) => {
  const { phone_number, password } = req.body;
  try {
    const user = await Auth.findOne({ phone_number });
    if (!user) return res.status(400).json({ message: "user doesnot exist" });
    // checking password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "username or password is wrong" });
    // Generating tokens
    const access = jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10d",
      }
    );
    // creating refresh token
    const refresh = jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10d",
      }
    );
    res.status(200).json({ access, refresh });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { SignIn, SignUp };
