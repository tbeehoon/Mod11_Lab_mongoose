// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Uses process.env.MONGO_URI from config.env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // stop app if DB fails
  }
};

module.exports = connectDB;