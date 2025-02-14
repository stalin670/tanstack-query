const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
