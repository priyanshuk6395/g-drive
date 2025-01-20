const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/terms", (req, res) => {
  res.render("terms");
});

router.post(
    "/register",
    [
      // Validate and sanitize inputs
      body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
      body("email")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, username, password } = req.body;
  
      try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        // Create user
        const user = await userModel.create({
          email,
          username,
          password: hashedPassword,
        });
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "12h" }
        );
  
        // Set token in cookies and send success response
        res.cookie("token", token);
        // Send sanitized response
        res.status(201).json({
          message: "User registered successfully",
        });
        res.redirect('../home');
      } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );
  
  // Login GET Route
  router.get("/login", (req, res) => {
    res.render("login");
  });
  
  // Login POST Route
  router.post(
    "/login",
    [
      // Validate and sanitize inputs
      body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
    async (req, res) => {
      try {
        // Validate inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array(), message: "Invalid data" });
        }
  
        const { username, password } = req.body;
        
  
        // Find user by username
        const user = await userModel.findOne({ username });
        if (!user) {
          return res.status(400).json({ message: "Invalid Credentials" });
        }
        
  
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid Credentials" });
        }
  
        // Generate JWT token
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "12h" }
        );
  
        // Set token in cookies and send success response
        res.cookie("token", token);
        res.status(200);
        res.redirect('../home')
      } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );

module.exports = router;
