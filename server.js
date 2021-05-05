const express = require("express");
// middleware
const morgan = require("morgan");
const cors = require("cors");
// to process user request
// const bodyParser = require("body-parser");

// to use environment variable
require("dotenv").config();
const app = express();
// require for database
const sequelize = require("./database/database");
sequelize
  .sync()
  .then(() => {
    console.log("MySQL connected.");
  })
  .catch((err) => {
    console.log(err);
  });

// app middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // allows all origins

// importing Authentication route
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const customerRoutes = require("./routes/customer");
const accountRoutes = require("./routes/account");
const payeeRoutes = require("./routes/payee");
const transactionRoutes = require("./routes/transaction");

// middleware
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/payee", payeeRoutes);
app.use("/api/transaction", transactionRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));
