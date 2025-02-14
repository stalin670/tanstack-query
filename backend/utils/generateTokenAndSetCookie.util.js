const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    return res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  } catch (error) {
    console.error("Error generating token or setting cookie", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = generateTokenAndSetCookie;
