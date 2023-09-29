const jwt = require('jsonwebtoken'); // Import JWTwebtoken package
const { expressjwt: expressJwt } = require("express-jwt"); // iNport Express JWT package

// Get jwt secret
const jwtSecret = process.env.JWT_SECRET;

// Middleware to generate JWT token
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const secretKey = jwtSecret; // Replace with your secret key
  const options = { expiresIn: '1h' }; // Set the expiration time
  return jwt.sign(payload, secretKey, options);
};

// Middleware to protect routes with JWT
const requireAuth = expressJwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.token, // Adjust this based on where your JWT token is located
});

module.exports = { generateToken, requireAuth };
