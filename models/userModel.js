const mongoose = require('mongoose');

// Define the user schema with validation, indexing, and security practices
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username cannot exceed 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address"
      ]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: true // Excludes the password field in queries by default
    }
  },
  {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Compile the schema into a model
const User = mongoose.model("user", userSchema);

module.exports = User;
