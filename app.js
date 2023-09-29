// Import the dotenv package and load environment variables
require('dotenv').config();

const express = require('express');
const sequelize = require('./models/index'); // Import Sequelize instance
const userRoutes = require('./routes/user'); // Create user routes

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Define your routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
