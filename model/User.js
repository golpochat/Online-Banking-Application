const { Sequelize } = require("sequelize");
const sequelize = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    resetPasswordLink: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    role: {
      type: Sequelize.ENUM("Admin", "Customer"),
      defaultValue: "Customer",
    },
    status: {
      type: Sequelize.TINYINT,
      defaultValue: 1,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(
          user.password,
          bcrypt.genSaltSync(saltRounds)
        );
      },
    },
  }
);

// validating password for login
User.prototype.validPassword = function (plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

// generating auth token
User.prototype.generateAuthToken = function (user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
module.exports = User;
