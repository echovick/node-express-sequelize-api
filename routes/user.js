const express = require("express");
const router = express.Router();
const { generateToken, requireAuth } = require("../middleware/authMiddleware");
const User = require("../models/user");
const UserController = require('../controllers/userController'); // Import user controller

// Create an instance of UserController and inject the User model
const userController = new UserController();

// Register a new user
router.post("/register", userController.register);

// Login user and generate a token
router.post("/login", userController.login);

// Protected route (requires authentication)
router.get("/profile", requireAuth, async (req, res) => {
  // req.user contains the authenticated user's information
  res.status(200).json({ user: req.user });
});

// GET route that returns "Hello World"
router.get("/hello", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Hello World!",
    status_code: 200,
    data: [],
  });
});

// GET route that returns "Hello World" using the UserController

module.exports = router;
