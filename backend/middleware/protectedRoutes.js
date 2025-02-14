const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decorded User : ", decoded);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = protectedRoutes;
