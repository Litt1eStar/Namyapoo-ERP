import Transaction from "../../models/transaction.model.js";
import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import { lineNotify } from "../lineNotify.js";

export const create = async (orders, workspace_id, user_id, res) => {
  const orderPromises = orders.map(async (order) => {
    const orderInfo = await Order.findById(order.order_id);
    return orderInfo;
  });
  const orderResults = await Promise.all(orderPromises);
  console.log(orderResults);

  orderResults.map(async (order) => {
    await Product.findByIdAndUpdate(
      order.product_id,
      { $inc: { amount: -order.quantity } },
      { new: true }
    );
  });

  const total = orderResults.reduce((acc, order) => acc + order.totalMargin, 0);

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


  await lineNotify(
    `Create New Transaction \n ต้นทุนทั้งหมด: ${newTransaction.totalMargin} บาท`
  );

  return newTransaction;
};
