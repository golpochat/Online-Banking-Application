// const { check } = require("express-validator");

// exports.userInputValidator = [
//   check("email")
//     .notEmpty()
//     .withMessage("Email is required.")
//     .isEmail()
//     .withMessage("Invalid email address."),
//   check("password")
//     .notEmpty()
//     .withMessage("Password is required.")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long."),
// ];

// exports.forgotPasswordValidator = [
//   check("email")
//     .notEmpty()
//     .withMessage("Email is required.")
//     .isEmail()
//     .withMessage("Invalid email address."),
// ];

// exports.resetPasswordValidator = [
//   check("newPassword")
//     .notEmpty()
//     .withMessage("Password is required.")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long."),
// ];

// exports.changePasswordValidator = [
//   check("password")
//     .notEmpty()
//     .withMessage("Password is required.")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long."),
//   check("confirm_password")
//     .notEmpty()
//     .withMessage("Confirm password is required.")
//     .isLength({ min: 6 })
//     .withMessage("Confirm password must be at least 6 characters long."),
// ];
