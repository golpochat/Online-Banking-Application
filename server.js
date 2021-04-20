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
    console.log("Connected to MySQL.");
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

// middleware
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));
