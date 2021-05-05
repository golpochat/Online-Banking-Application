const { check } = require("express-validator");
const validator = require("validator");
exports.addUserValidator = [
  check("email")
    .notEmpty()
    .withMessage("An email is required.")
    .isEmail()
    .withMessage("Invalid email address."),
  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

exports.changePasswordValidator = [
  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  check("confirm_password")
    .notEmpty()
    .withMessage("Confirm password is required.")
    .isLength({ min: 8 })
    .withMessage("Confirm password must be at least 8 characters long."),
];
