const Sequelize = require("sequelize");
const sequelize = require("../database/database");
const Customer = require("./Customer");
const Payee = require("./Payee");

const Transaction = sequelize.define("transactions", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  receiver: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  reference: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("Completed", "Pending"),
    defaultValue: "Pending",
  },
});

Customer.hasMany(Transaction, { as: "transaction" });
Transaction.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

Payee.hasMany(Transaction, { as: "transaction" });
Transaction.belongsTo(Payee, { foreignKey: "payeeId", as: "payee" });

module.exports = Transaction;
