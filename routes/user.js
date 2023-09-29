const express = require("express");
const router = express.Router();
const { generateToken, requireAuth } = require("../middleware/authMiddleware");
const User = require("../models/user");
const UserController = require('../controllers/userController'); // Import user controller

// Create an instance of UserController and inject the User model
const userController = new UserController();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user and generate a token
router.post("/login", async (req, res) => {
  try {
    console.error(User());
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new Error("Invalid login credentials");
    }

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

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
router.get('/hello', userController.index);

module.exports = router;
