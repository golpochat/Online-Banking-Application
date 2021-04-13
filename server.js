const express = require("express");
// middleware
const morgan = require("morgan");
const cors = require("cors");
// to process user request
const bodyParser = require("body-parser");

// to use environment variable
require("dotenv").config();
const app = express();
// require for database
const sequelize = require("./database/database");
sequelize
  .sync()
  .then(() => {
    console.log("MySQL database connected.");
  })
  .catch((err) => {
    console.log(err);
  });

// app middleware0
app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // allows all origins

// importing Authentication route
const userRoutes = require("./routes/user");

// middleware
app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));
