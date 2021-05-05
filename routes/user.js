const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  addUser,
  editUser,
  viewUser,
  viewAllUser,
  deleteUser,
  userActivation,
} = require("../controller/userController");

// // import validator to apply validation on signup route
const {
  addUserValidator,
  changePasswordValidator,
} = require("../validator/user");
// writing index.js is optional
const { runValidation } = require("../validator");

router.post("/add", addUserValidator, runValidation, addUser);
router.put(
  "/update/",
  changePasswordValidator,
  runValidation,
  requireLogin,
  editUser
);
router.delete(
  "/delete/:id",
  runValidation,
  requireLogin,
  adminMiddleware,
  deleteUser
);
router.get("/view/:id", runValidation, requireLogin, viewUser);
router.get("/list", runValidation, requireLogin, adminMiddleware, viewAllUser);
router.put("/user-activate/:id", requireLogin, adminMiddleware, userActivation);

module.exports = router;
