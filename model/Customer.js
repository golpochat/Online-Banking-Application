const Sequelize = require("sequelize");
const sequelize = require("../database/database");
const User = require("./User");

const Customer = sequelize.define("customers", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    validate: {
      max: 50,
    },
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      max: 50,
    },
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      min: 5,
      max: 255,
      isEmail: true,
    },
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  status: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
});
User.hasMany(Customer, { as: "customer" });
Customer.belongsTo(User, { foreignKey: "userId", as: "user" });
module.exports = Customer;
