const User = require("../models/user");
const jwt = require('jsonwebtoken'); // Import JWTwebtoken package

function generateAccessToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  
  const secret = 'marandmorapp-secret-key';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
}

class UserController {
  // Constructor to inject the User model
  constructor(User) {
    this.User = User;
  }

  // Register function
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        status: true,
        message: "Registration Successful",
        statusCode: 201,
        data: user,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Login function
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      // Check if email/user exists
      if (!user) {
        res.status(401).json({
          status: false,
          message: "User does not exist on our database",
          statusCode: 401,
        });
      }

      // Check if passwords match
      if (user.password !== password) {
        res.status(401).json({
          status: false,
          message: "Incorrect password",
          statusCode: 401,
        });
      }
      
      // Generate Access token for user
      const token = generateAccessToken(user);
      
      res.status(200).json({
        status: true,
        message: "Login Successful",
        statusCode: 200,
        token: token,
        data: user,
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = UserController;
