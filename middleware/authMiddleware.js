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

function verifyAccessToken(token) {
  const secret = 'marandmorapp-secret-key';

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Middleware to protect routes with JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.user = result.data;
  next();
}

module.exports = { generateToken, authenticateToken };
