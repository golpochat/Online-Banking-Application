const User = require("../model/User");
exports.addUser = (req, res, next) => {
  console.log(req.body);
  const { username, password, role } = req.body;
  User.create({
    username: username,
    password: password,
    role: role,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err.errors[0].message,
      });
    });
};
exports.editUser = () => {};
exports.viewUser = () => {};
exports.deleteUser = () => {};
exports.viewAllUser = () => {};
