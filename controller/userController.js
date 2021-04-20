const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.addUser = (req, res, next) => {
  const { email, password, role } = req.body;
  User.create({
    email: email,
    password: password,
    role: role,
  })
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err.errors[0].message,
      });
    });
};
exports.editUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(async (user) => {
      if (!user)
        return res.status(404).json("Invalid user, can not be updated.");
      const { email, password, role } = req.body;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      User.update(
        {
          email: email,
          password: hashedPassword,
          role: role,
        },
        { where: { id: req.params.id } }
      )
        .then((result) => {
          console.log(result);
          res.send(user);
          // res.send("User has been updated.");
        })
        .catch((err) => {
          // console.log(err);
          res.send("Something went wrong, user could not be updated.");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.viewUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.send("Something went wrong, please contact admin.");
    });
};
exports.deleteUser = (req, res, next) => {
  console.log(req.params.id);
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user)
        return res.status(404).json("Invalid user, can not be deleted.");
      User.destroy({
        where: { id: req.params.id },
      })
        .then((result) => {
          console.log(result);
          res.send("User has been deleted.");
        })
        .catch((err) => {
          console.log(err);
          res.send("Something went wrong, user could not be deleted.");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.viewAllUser = (req, res, next) => {
  User.findAll()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("Something went wrong, please contact admin.");
    });
};
