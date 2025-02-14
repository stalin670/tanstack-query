const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to mongoDB ${error.message}`);
    process.exit(0);
  }
};

module.exports = connectDB;
