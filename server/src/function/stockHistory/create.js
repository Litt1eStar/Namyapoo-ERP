import StockHistory from "../../models/stockHistory.model.js";

export const _create = async (
  product_name,
  stock_type,
  amount,
  createdAt,
  user_id,
  res
) => {
  const newHistory = await StockHistory.create({
    product_name,
    stock_type,
    amount,
    createdAt,
    user_id,    
  });
  if (!newHistory)
    return res.status(400).json({ error: "Failed to create new History" });

  return newHistory;
};
