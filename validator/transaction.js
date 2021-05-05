const { check } = require("express-validator");

exports.transactionValidator = [
  check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isNumeric()
    .withMessage("Numbers only please."),
  check("description")
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ max: 100 })
    .withMessage("Description can be max 100 characters long."),
  check("reference")
    .notEmpty()
    .withMessage("Reference is required.")
    .isLength({ max: 100 })
    .withMessage("Reference can be max 100 characters long."),
];
