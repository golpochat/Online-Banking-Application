const { check } = require("express-validator");

exports.accountValidator = [
  check("type").notEmpty().withMessage("Type of account is required."),
  check("accountName")
    .notEmpty()
    .withMessage("Account name is required.")
    .isLength({ max: 30 })
    .withMessage("Account name can be max 30 characters long."),
  check("accountNumber")
    .notEmpty()
    .withMessage("Account number is required.")
    .isLength({ max: 20 })
    .withMessage("Account number can be max 20 characters long."),
  check("sortcode")
    .notEmpty()
    .withMessage("Sortcode is required.")
    .isLength({ max: 10 })
    .withMessage("Sortcode can be max 10 characters long."),
  check("bic")
    .notEmpty()
    .withMessage("BIC number is required.")
    .isLength({ max: 15 })
    .withMessage("BIC can be max 15 characters long."),
  check("iban")
    .notEmpty()
    .withMessage("IBAN  is required.")
    .isLength({ max: 50 })
    .withMessage("IBAN can be max 50 characters long."),
];
