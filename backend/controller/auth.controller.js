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

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    if (user) {
      generateTokenAndSetCookie(user._id, res);
      await user.save();
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: newUser.email,
      });
    } else {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
