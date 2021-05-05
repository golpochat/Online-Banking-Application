// loading model
const Payee = require("../model/Payee");
const Transaction = require("../model/Transaction");
const sequelize = require("../database/database");
const Account = require("../model/Account");
const Customer = require("../model/Customer");

// find all transactions
exports.viewAllTransaction = (req, res) => {
  // Transaction.findAll({where:{status:'Completed'}})
  Transaction.findAll({
    include: ["payee", "customer"],
  })
    .then((transactions) => {
      // console.log(transactions);
      res.send(transactions);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};

// find all transactions for each customer
exports.viewAllTransactionByCustomer = (req, res) => {
  // Transaction.findAll({where:{status:'Completed'}})
  Transaction.findAll({
    where: { customerId: req.params.id },
    include: ["payee", "customer"],
  })
    .then((transactions) => {
      // console.log(transactions);
      res.send(transactions);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};
// find all transactions
exports.viewAllTransactionByAccount = (req, res) => {
  // Transaction.findAll({where:{status:'Completed'}})
  // console.log(req.params.id);
  Transaction.findAll({
    where: { receiver: req.params.id, status: "Completed" },
    include: ["payee", "customer"],
  })
    .then((transactions) => {
      // console.log(transactions);
      res.send(transactions);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};

// reading account details
exports.viewTransaction = (req, res) => {
  Transaction.findOne({
    where: { id: req.params.id },
    include: ["payee", "customer"],
  })
    .then((transaction) => {
      // console.log(transaction);
      return res.status(200).send(transaction);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transaction.",
      });
    });
};

// create transaction
exports.createTransaction = (req, res) => {
  // console.log(req.body);
  const payeeId = req.params.id;
  // console.log(payeeId);
  Payee.findByPk(payeeId, { include: "customer" }).then((payee) => {
    // console.log(payee);
    if (!payee) {
      return res.status(404).json({
        error: "Payee doesn't exist.",
      });
    }

    if (!payee.customer.status) {
      return res.status(401).json({
        error:
          "Customer is not authorized to make any transaction, please contact admin.",
      });
    }
    const customerId = payee.customerId;
    const receiver = payee.accountNumber;
    const { amount, description, reference } = req.body;

    if (amount <= 0) {
      return res.status(401).json({
        error: "Invalid amount.",
      });
    }

    // balance checking

    Account.findOne({ where: { customerId: customerId } })
      .then((account) => {
        // console.log(account);
        const myAccountNumber = account.accountNumber;

        Transaction.findAll({
          where: { receiver: myAccountNumber, status: "Completed" },
          attributes: [
            [sequelize.fn("sum", sequelize.col("amount")), "total_receiving"],
          ],
          raw: true,
        }).then((receive) => {
          // console.log(receive);
          const amountReceived = receive[0].total_receiving;
          let amountSent = 0;
          Transaction.findAll({
            where: { customerId: customerId },
            attributes: [
              [sequelize.fn("sum", sequelize.col("amount")), "total_sending"],
            ],
            raw: true,
          }).then((result) => {
            // console.log(result);
            amountSent = result[0].total_sending;
            const balance = amountReceived - amountSent;
            // console.log(balance);
            if (balance < amount) {
              return res.status(401).json({
                error:
                  "Insufficient balance, amount exceeded your current balance.",
              });
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          error:
            err.errors[0].message || "Someting went wrong, try again later.",
        });
      });

    // enf of balance checking

    Transaction.create({
      customerId,
      payeeId,
      amount,
      description,
      reference,
      receiver,
    })
      .then((transaction) => {
        // console.log(transaction);
        return res.send(transaction);
      })
      .catch((err) => {
        // console.log(err);
      });
  });
};

// updating transaction
exports.updateTransaction = (req, res) => {
  const id = req.params.id;
  Transaction.findByPk(id).then((transaction) => {
    // console.log(transaction);
    if (!transaction) {
      return res.status(404).json({
        error: "Invalid transaction id, contact to admin.",
      });
    }
  });

  const { amount, description, reference } = req.body;
  Transaction.update(
    {
      amount,
      description,
      reference,
    },
    { where: { id: id } }
  )
    .then((transaction) => {
      // console.log(transaction);
      return res
        .status(200)
        .json({ message: "Transaction updated successfully." });
    })
    .catch((err) => {
      // console.log(err);
      return res.status(400).json({
        error: err.errors[0].message,
      });
    });
};

// releasing transaction
exports.releaseTransaction = (req, res) => {
  const id = req.params.id;
  Transaction.findByPk(id).then((transaction) => {
    // console.log(transaction);
    if (!transaction) {
      return res.status(404).json({
        error: "Invalid transaction id, contact to admin.",
      });
    }
  });

  const { status, accountNumber } = req.body;
  console.log("ACCOUNT NUMBER: ", accountNumber);
  // to check if the customer exists with the account number
  Account.findOne({ where: { accountNumber: accountNumber } })
    .then((account) => {
      // console.log(account);
      if (!account) {
        return res.status(404).json({
          error: `Customer with ${accountNumber} account number doesn't exist.`,
        });
      }

      Transaction.update(
        {
          status,
        },
        { where: { id: id } }
      )
        .then((transaction) => {
          // console.log(transaction);
          return res
            .status(200)
            .json({ message: "Transaction released successfully." });
        })
        .catch((err) => {
          // console.log(err);
          return res.status(400).json({
            error: err.errors[0].message,
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
  // end of chcking
};
