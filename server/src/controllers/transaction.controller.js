import { create } from "../function/transaction/create.js";
import { _getTransaction } from "../function/transaction/getTransaction.js";
import Transaction from "../models/transaction.model.js";

export const createTransactoin = async (req, res) => {
  const user_id = req.user.id;
  const { workspace_id } = req.params;
  const orders = req.body;

  try {
    const newTransaction = await create(orders, workspace_id, user_id, res);
    res.status(200).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransaction = async (req, res) => {
  const user_id = req.user.id;

  try {
    const transactions = await _getTransaction(user_id, res);
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
