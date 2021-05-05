const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");
//  import controller
const {
  viewCustomer,
  createCustomer,
  updateCustomer,
  viewAllCustomer,
  customerActivation,
} = require("../controller/customerController");

// import validator to apply validation on customer route
const { customerValidator } = require("../validator/customer");
const { runValidation } = require("../validator");

// private router
router.get("/list", requireLogin, adminMiddleware, viewAllCustomer);
// get customer to display in the ranking
router.get("/read/:id", requireLogin, viewCustomer);
router.post(
  "/create",
  requireLogin,
  customerValidator,
  runValidation,
  createCustomer
);
router.put(
  "/update",
  requireLogin,
  customerValidator,
  runValidation,
  updateCustomer
);

router.put(
  "/customer-activate/:id",
  requireLogin,
  adminMiddleware,
  customerActivation
);

module.exports = router;
