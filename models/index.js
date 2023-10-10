"use strict";
// models/index.js

const Sequelize = require('sequelize');
const config = require('../config/config'); // Your database configuration file
const { username, password, database, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

const models = {
  User: new require('./user'), // Import User model from User.js

  // ... other models
};

// Define associations if needed
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
