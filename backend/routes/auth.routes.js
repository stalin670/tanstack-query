const express = require("express");

const router = express.Router();
const protectedRoutes = require("../middleware/protectedRoutes.js");

const {
  signup,
  login,
  logout,
  getMe,
} = require("../controller/auth.controller.js");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectedRoutes, getMe);

module.exports = router;
