const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");
//  import controller
const {
  viewAccount,
  createAccount,
  updateAccount,
  viewAllAccount,
} = require("../controller/accountController");

// import validator to apply validation on account route
const { accountValidator } = require("../validator/account");
const { runValidation } = require("../validator");

// private router
router.get("/all", requireLogin, adminMiddleware, viewAllAccount);
// get account to display in the ranking
router.get("/view/:id", requireLogin, viewAccount);
router.post(
  "/create/:id",
  requireLogin,
  accountValidator,
  runValidation,
  createAccount
);
router.put(
  "/update/:id",
  requireLogin,
  accountValidator,
  runValidation,
  updateAccount
);

module.exports = router;
