const mongoose = require('mongoose');

// MongoDB connection string
const uri = `mongodb+srv://priyanshuk6395:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.32ceo.mongodb.net/?retryWrites=true&w=majority`;


const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectDB;
