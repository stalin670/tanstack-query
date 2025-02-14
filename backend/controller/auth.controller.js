const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isValidEmail } = require("../utils/validator.util.js");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie.util.js");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be atleast 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      generateTokenAndSetCookie(user._id, res);
      await user.save();
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "user does not exist." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getMe,
};
