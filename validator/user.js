const { check } = require("express-validator");
const validator = require("validator");
exports.addUserValidator = [
  check("username")
    .notEmpty()
    .withMessage("Username is required.")
    .isEmail()
    .withMessage("Invalid email address."),
  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  check("role").notEmpty().withMessage("Role must be entered."),
];
