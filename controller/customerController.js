// loading user model
const Customer = require("../model/Customer");
const User = require("../model/User");

// find all Registration
exports.viewAllCustomer = (req, res) => {
  // Customer.findAll({ where: { role: "Customer" } })
  Customer.findAll()
    .then((customers) => {
      if (!customers)
        res.status(404).send({ message: "No customers were found! " });
      else res.status(200).send(customers);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers.",
      });
    });
};

// reading customer profile
exports.viewCustomer = (req, res) => {
  const userId = req.user.userId;
  Customer.findOne({ where: { userId: userId }, include: "user" })
    .then((customer) => {
      // console.log(customer);
      if (customer) return res.status(200).send(customer);
      res.status.send({ message: "No customer was found! " });
      // res.send({ message: "No customer was found! " });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customer.",
      });
    });
};

// reading user customer
exports.adminView = (req, res) => {
  const userId = req.user.userId;
  Customer.findByPk(userId)
    .then((customer) => {
      if (!customer)
        res.status(404).send({ message: "No customer was found! " });
      else res.status(200).send(customer);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customer.",
      });
    });
};

// create customer profile
exports.createCustomer = (req, res) => {
  const userId = req.user.userId;
  User.findByPk(userId).then((user) => {
    if (!user) {
      return res.status(404).json({
        error: "User doesn't exist.",
      });
    }
  });

  const { firstName, lastName, address, mobile, dob, email } = req.body;
  Customer.create({
    userId,
    firstName,
    lastName,
    email,
    address,
    mobile,
    dob,
  })
    .then((customer) => {
      // console.log(result);
      return res.send(customer);
    })
    .catch((err) => {
      // console.log(err);
      return res.status(400).json({
        error: err.errors[0].message,
      });
    });
};

// updating user profile
exports.updateCustomer = (req, res) => {
  const userId = req.user.userId;
  console.log(userId);
  Customer.findOne({ where: { userId: userId } }).then((customer) => {
    console.log(customer);
    if (!customer) {
      return res.json({
        error: "Invalid customer id, contact to admin.",
      });
    }
  });

  const { firstName, lastName, address, mobile, dob, email, status } = req.body;
  Customer.update(
    {
      firstName,
      lastName,
      email,
      address,
      mobile,
      dob,
      status,
    },
    { where: { userId: userId } }
  )
    .then((customer) => {
      // console.log(customer);
      return res
        .status(200)
        .json({ message: "Customer updated successfully." });
    })
    .catch((err) => {
      // console.log(err);
      return res.status(400).json({
        error: err.errors[0].message,
      });
    });
};

// activate/deactivate user
exports.customerActivation = (req, res) => {
  const customerId = req.params.id;
  // console.log(customerId);
  Customer.findByPk(customerId)
    .then((customer) => {
      console.log(customer);
      if (!customer)
        return res.status(404).json("Invalid customer, can not be updated.");
      const { status } = req.body;
      Customer.update(
        {
          status: status,
        },
        { where: { id: customerId } }
      )
        .then((result) => {
          // console.log(result);
          res.send(result);
          // res.send("Customer has been updated.");
        })
        .catch((err) => {
          // console.log(err);
          res.send("Something went wrong, customer could not be updated.");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
