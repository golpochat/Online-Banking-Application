// loading user model
const Customer = require("../model/Customer");
const Account = require("../model/Account");

// find all accounts
exports.viewAllAccount = (req, res) => {
  // Account.findAll({ where: { role: "Account" } })
  Account.findAll()
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accounts.",
      });
    });
};

// reading account details
exports.viewAccount = (req, res) => {
  console.log("customer idddd: ", req.params.id);
  Account.findOne({ where: { customerId: req.params.id } })
    .then((account) => {
      // console.log(account);
      // if (!account) res.status(404).send({ message: "No account was found! " });
      // else
      res.status(200).send(account);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving account.",
      });
    });
};

// create account
exports.createAccount = (req, res) => {
  // console.log(req.body);
  Customer.findByPk(req.params.id).then((customer) => {
    if (!customer) {
      return res.status(404).json({
        error: "Customer doesn't exist.",
      });
    }
  });
  const customerId = req.params.id;
  const { type, accountNumber, accountName, sortcode, bic, iban } = req.body;
  Account.create({
    customerId,
    type,
    accountNumber,
    accountName,
    sortcode,
    bic,
    iban,
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

// updating customer profile
exports.updateAccount = (req, res) => {
  const id = req.params.id;
  Account.findByPk(id).then((account) => {
    // console.log(account);
    if (!account) {
      return res.status(404).json({
        error: "Invalid account id, contact to admin.",
      });
    }
  });

  const { type, accountNumber, accountName, sortcode, bic, iban } = req.body;
  Account.update(
    {
      type,
      accountNumber,
      accountName,
      sortcode,
      bic,
      iban,
    },
    { where: { id: id } }
  )
    .then((account) => {
      // console.log(account);
      return res.status(200).json({ message: "Account updated successfully." });
    })
    .catch((err) => {
      // console.log(err);
      return res.status(400).json({
        error: err.errors[0].message,
      });
    });
};
