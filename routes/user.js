const express = require("express");
const router = express.Router();
const {
  generateToken,
  authenticateToken,
} = require("../middleware/authMiddleware");
const User = require("../models/user");
const UserController = require("../controllers/userController"); // Import user controller

// Create an instance of UserController and inject the User model
const userController = new UserController();

// Register a new user
router.post("/register", userController.register);

// Login user and generate a token
router.post("/login", userController.login);

// Protected route (requires authentication)
router.get("/profile", authenticateToken, async (req, res) => {
  // req.user contains the authenticated user's information

  const sales = {
    no_of_sales: 10,
    sales_list: { item: "John", price: 100 },
  };

  const staffs = {
    no_of_staffs: 10,
    staff_list: [
      {
        name: "John",
        age: 30,
        occupation: "Developer",
      },
      {
        name: "Alice",
        age: 25,
        occupation: "Designer",
      },
      {
        name: "Bob",
        age: 35,
        occupation: "Manager",
      },
    ],
  };

  const activities = {
    no_of_activities: 10,
    list_of_activities: [
      {
        date: "20-10-2023",
        activitiy: "User logged in",
      },
      {
        date: "20-10-2023",
        activitiy: "User logged in",
      },
      {
        date: "20-10-2023",
        activitiy: "User logged in",
      },
    ],
  };

  res.status(200).json({
    status: true,
    message: "Profile Retrieved Successfully",
    statusCode: 200,
    data: {
      sales: sales,
      staffs: staffs,
      activities: activities
    },
  });
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
