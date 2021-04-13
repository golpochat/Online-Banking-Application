const express = require("express");
const router = express.Router();

//  import controller
const {
  addUser,
  editUser,
  viewUser,
  viewAllUser,
  deleteUser,
} = require("../controller/userController");

// // import validator to apply validation on signup route
const { addUserValidator } = require("../validator/user");
// writing index.js is optional
const { runValidation } = require("../validator");

router.post("/add", addUserValidator, runValidation, addUser);
router.put("/update/:id", addUserValidator, runValidation, editUser);
router.get("/view/:id", runValidation, viewUser);
router.get("/all", runValidation, viewAllUser);

module.exports = router;
