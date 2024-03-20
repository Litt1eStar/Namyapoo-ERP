import Order from "../models/order.model.js";
import Transaction from "../models/transaction.model.js";

export const createTransactoin = async (req, res) => {
  const user_id = req.user.id;
  const orders = req.body;

  try {
    const orderPromises = orders.map(async (order) => {
      const orderInfo = await Order.findById(order.order_id);
      return orderInfo;
    });
    const orderResults = await Promise.all(orderPromises);

    const total = orderResults.reduce(
      (acc, order) => acc + order.totalMargin,
      0
    );

    if (!orderResults)
      return res
        .status(400)
        .json({ error: "Failed to get order to make transaction" });

    const newTransaction = await Transaction.create({
      orders: orderResults,
      totalMargin: total,
      user_id,
    });
    if (!newTransaction)
      return res.status(400).json({ error: "Failed to crate Transaction" });

    res.status(200).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransaction = async (req, res) => {
  const user_id = req.user.id;

  try {
    const transactions = await Transaction.find({ user_id });
    if (!transactions)
      return res.status(400).json({ error: "Transaction not found" });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
