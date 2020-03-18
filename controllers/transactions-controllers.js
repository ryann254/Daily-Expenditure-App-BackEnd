const Transaction = require("../models/Transaction");

//@route GET api/v1/transactions
//@access public
//@desc gets all transactions

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error!"
    });
  }
};

//@route POST api/v1/transactions
//@access public
//@desc adds all transactions

exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error!"
      });
    }
  }
};

//@route DELETE api/v1/transactions/:id
//@access public
//@desc deletes all transactions

exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(400).json({
        success: false,
        error: "No transaction found"
      });
    }

    await transaction.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Transaction successfully removed"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error!"
    });
  }
};
