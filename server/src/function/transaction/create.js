import Transaction from "../../models/transaction.model.js";
import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import { lineNotify } from "../lineNotify.js";
import { _create } from '../stockHistory/create.js'
import { _create as accountCreate} from "../accounting/create.js"
import { formattedDate } from "../../utils/formattedDate.js";
import { updateCache } from "../../utils/updateCache.js";

export const create = async (orders, workspace_id, user_id, area_price) => {
  const orderPromises = orders.map(async (order) => {
    const orderInfo = await Order.findById(order.order_id);
    return orderInfo;
  });
  const orderResults = await Promise.all(orderPromises);

  orderResults.map(async (order) => {
    await Product.findByIdAndUpdate(
      order.product_id,
      { $inc: { amount: -order.quantity } },
      { new: true }
    );

    //Stock History
    await _create(
      order.product_name,
      "Export",
      order.quantity,
      formattedDate(order.createdAt),
      user_id
    )
  });
  
  

  const sumOfOrder = orderResults.reduce((acc, order) => acc + order.totalMargin, 0);
  const total = Number(sumOfOrder) + Number(area_price);
  if (!orderResults)
    throw new Error('Failed to get order to make transaction')
  
  const newTransaction = await Transaction.create({
    orders: orderResults,
    totalMargin: total,
    user_id,
    workspace_id,
    area_price
  });
  if (!newTransaction)
    throw new Error('Failed to create new Transaction')

  await updateCache("Product", "products", user_id);
  await updateCache("StockHistory", "stockHistorys", user_id);

  return newTransaction;
};
