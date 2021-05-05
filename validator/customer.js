const { check } = require("express-validator");

exports.customerValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ max: 50 })
    .withMessage("First name can be max 50 characters long."),
  check("lastName")
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ max: 50 })
    .withMessage("Last name can be max 50 characters long."),
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address."),
  check("address")
    .notEmpty()
    .withMessage("Address is required.")
    .isLength({ max: 150 })
    .withMessage("Address can be max 150 characters long."),
  check("mobile")
    .notEmpty()
    .withMessage("Contact number is required.")
    .isLength({ max: 15 })
    .withMessage("Contact number can be max 15 characters long."),
  check("dob").notEmpty().withMessage("Date of birth is required."),
];
