const { Sequelize } = require("sequelize");
const sequelize = require("../database/database");
const Customer = require("./Customer");

const Payee = sequelize.define("payees", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  payeeName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bankName: {
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

Customer.hasMany(Payee, { as: "payee" });
Payee.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

module.exports = Payee;
