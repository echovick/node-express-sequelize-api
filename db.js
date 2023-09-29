const Sequelize = require('sequelize');
const config = require('./config/config.json');

const { username, password, database, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

module.exports = sequelize;
