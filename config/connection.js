// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
// initiate dotenv package - sensitive data won't be exposed
require('dotenv').config();

// create a connection to the database, pass in MySQL information for username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;