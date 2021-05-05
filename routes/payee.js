const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");
//  import controller
const {
  viewPayee,
  createPayee,
  updatePayee,
  viewAllPayee,
} = require("../controller/payeeController");

// import validator to apply validation on payee route
const { payeeValidator } = require("../validator/payee");
const { runValidation } = require("../validator");

// private router
router.get("/list/:id", requireLogin, viewAllPayee);
// get payee to display in the ranking
router.get("/read/:id", requireLogin, viewPayee);
router.post(
  "/create/:id",
  requireLogin,
  payeeValidator,
  runValidation,
  createPayee
);
router.put(
  "/update/:id",
  requireLogin,
  payeeValidator,
  runValidation,
  updatePayee
);

module.exports = router;
