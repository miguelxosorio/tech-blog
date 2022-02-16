// import sequelize DataTypes object to define what type of data it will be
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the user model
class User extends Model {}

// define table columns and configuration
User.init(
  {
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // no duplicate email
      unique: true,
      // if allownull is false, run data through validators before creating the table data
      validate: {
        isEmail: true,
      },
    },
    // password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // password must be atleast 4 characters long
        len: [4],
      },
    },
  },
  {
    // Table config options
    // pass in imported sequelize connection (direct connection to database)
    sequelize,
    // don't create timestamp fields automatically
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camelcasing
    underscored: true,
    // model name stays lowercase in the database
    modelName: 'user',
  }
);

module.exports = User;
