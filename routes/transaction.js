const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");
//  import controller
const {
  viewTransaction,
  createTransaction,
  updateTransaction,
  viewAllTransaction,
  viewAllTransactionByCustomer,
  viewAllTransactionByAccount,
  releaseTransaction,
} = require("../controller/transactionController");

// import validator to apply validation on transaction route
const { transactionValidator } = require("../validator/transaction");
const { runValidation } = require("../validator");

// private router
router.get("/list", requireLogin, adminMiddleware, viewAllTransaction);
router.get("/listByCustomer/:id", requireLogin, viewAllTransactionByCustomer);
router.get("/listByAccount/:id", requireLogin, viewAllTransactionByAccount);
// get transaction to display in the ranking
router.get("/read/:id", requireLogin, viewTransaction);
router.post(
  "/create/:id",
  requireLogin,
  transactionValidator,
  runValidation,
  createTransaction
);
router.put(
  "/update/:id",
  requireLogin,
  transactionValidator,
  runValidation,
  updateTransaction
);

router.put(
  "/release-transaction/:id",
  requireLogin,
  runValidation,
  adminMiddleware,
  releaseTransaction
);

module.exports = router;
