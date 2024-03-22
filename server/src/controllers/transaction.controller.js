import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Transaction from "../models/transaction.model.js";
import { lineNotify } from "../function/lineNotify.js";

export const createTransactoin = async (req, res) => {
  const user_id = req.user.id;
  const { workspace_id } = req.params;
  const orders = req.body;

  try {
    const orderPromises = orders.map(async (order) => {
      const orderInfo = await Order.findById(order.order_id);
      return orderInfo;
    });
    const orderResults = await Promise.all(orderPromises);
    console.log(orderResults);
    const productPromises = orderResults.map(async (order) => {
      const product = await Product.findByIdAndUpdate(
        order.product_id,
        { $inc: { amount: -order.quantity } },
        { new: true }
      );
      return product;
    });

    const productResults = await Promise.all(productPromises);
    console.log(productResults);
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
      workspace_id,
    });
    if (!newTransaction)
      return res.status(400).json({ error: "Failed to crate Transaction" });

    //Updat Inventory Amoutn

    await lineNotify(
      `Create New Transaction \n ต้นทุนทั้งหมด: ${newTransaction.totalMargin} บาท`
    );
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

export const getTransactionById = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(500).json({ error: "Internal server error" });

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction)
      return res.status(400).json({ error: "Transaction not found" });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransactionByWorkspaceId = async (req, res) => {
  const { workspace_id } = req.params;

  if (!workspace_id)
    return res.status(500).json({ error: "Internal server error" });

  try {
    const transaction = await Transaction.findOne({ workspace_id });
    if (!transaction)
      return res.status(400).json({ error: "Transaction not found" });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
