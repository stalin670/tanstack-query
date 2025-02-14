const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectDB");
const authRoutes = require("./routes/auth.routes.js");

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
