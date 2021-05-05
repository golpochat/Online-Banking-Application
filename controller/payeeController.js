// loading user model
const Customer = require("../model/Customer");
const Payee = require("../model/Payee");

// find all payees
exports.viewAllPayee = (req, res) => {
  Payee.findAll({ where: { customerId: req.params.id } })
    .then((payees) => {
      // console.log(payees);
      res.send(payees);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accounts.",
      });
    });
};

// reading payee details
exports.viewPayee = (req, res) => {
  Payee.findByPk(req.params.id)
    .then((payee) => {
      if (!payee) res.status(404).send({ message: "No payee was found! " });
      else res.status(200).send(payee);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving payee.",
      });
    });
};

// create payee
exports.createPayee = (req, res) => {
  // console.log(req.body);
  Customer.findByPk(req.params.id).then((customer) => {
    if (!customer) {
      return res.status(404).json({
        error: "Customer doesn't exist.",
      });
    }
  });
  const customerId = req.params.id;
  const { payeeName, bankName, accountNumber, sortcode, bic, iban } = req.body;
  Payee.create({
    customerId,
    payeeName,
    bankName,
    accountNumber,
    sortcode,
    bic,
    iban,
  })
    .then((customer) => {
      // console.log(payees);
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
exports.updatePayee = (req, res) => {
  const id = req.params.id;
  Payee.findByPk(id).then((payee) => {
    // console.log(payee);
    if (!payee) {
      return res.status(404).json({
        error: "Invalid payee id, contact to admin.",
      });
    }
  });

  const { payeeName, bankName, accountNumber, sortcode, bic, iban } = req.body;
  Payee.update(
    {
      payeeName,
      bankName,
      accountNumber,
      sortcode,
      bic,
      iban,
    },
    { where: { id: id } }
  )
    .then((payee) => {
      // console.log(payee);
      return res.status(200).json({ message: "Payee updated successfully." });
    })
    .catch((err) => {
      // console.log(err);
      return res.status(400).json({
        error: err.errors[0].message,
      });
    });
};
