import StockHistory from "../../models/stockHistory.model.js";

export const _create = async (
  product_name,
  stock_type,
  amount,
  createdAt,
  user_id,
) => {
  const newHistory = await StockHistory.create({
    product_name,
    stock_type,
    amount,
    createdAt,
    user_id,    
  });
  return newHistory;
};
