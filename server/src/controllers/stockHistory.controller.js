import { _create } from "../function/stockHistory/create.js";
import StockHistory from "../models/stockHistory.model.js";

export const getAll = async (req, res) => {
  const user_id = req.user.id;

  if (!user_id) return res.status(500).json({ error: "Token not provided" });

  try {
    const historys = await StockHistory.find({ user_id });
    if (!historys)
      return res.status(400).json({ error: "Failed to get history" });

    res.status(200).json(historys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  const { product_name, stock_type, amount, createdAt } = req.body;
  const user_id = req.user.id;

  if (!product_name || !stock_type || !amount || !createdAt)
    return res.status(500).json({ error: "Credential is not complete" });

  if (!user_id) return res.status(500).json({ error: "Token not provided" });

  try {
    const newHistory = await _create(
      product_name,
      stock_type,
      amount,
      createdAt,
      user_id,
    );
    if(!newHistory)
      return res.status(400).json({error: "Failed to create new History"})
    
    res.status(200).json(newHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
