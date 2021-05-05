const { Sequelize } = require("sequelize");
const sequelize = require("../database/database");
const Customer = require("./Customer");

const Account = sequelize.define("accounts", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM("Current", "Saving"),
    allowNull: false,
    defaultValue: "Current",
  },
  customerId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  accountName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  sortcode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bic: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  iban: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
});

Customer.hasMany(Account, { as: "account" });
Account.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

module.exports = Account;
