import redisClient from "../../redisClient.js";
import { lineNotify } from "../function/lineNotify.js";
import { create } from "../function/transaction/create.js";
import { _getTransaction } from "../function/transaction/getTransaction.js";
import { _updateStatus } from "../function/transaction/updateStatus.js";
import Transaction from "../models/transaction.model.js";
import { updateCache } from "../utils/updateCache.js";

export const createTransactoin = async (req, res) => {
  const user_id = req.user.id;
  const { workspace_id } = req.params;
  const { orders, area_price } = req.body;

  try {
    const newTransaction = await create(
      orders,
      workspace_id,
      user_id,
      area_price
    );
    await updateCache("Transaction", "transactions", user_id);
    res.status(200).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransaction = async (req) => {
  const user_id = req.user.id;

  try {
    const transactions = await _getTransaction(user_id);
    await redisClient.set(
      `transactions:${user_id}`,
      JSON.stringify(transactions)
    );
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

export const updateStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await _updateStatus(id);
    if (!transaction) throw new Error("Failed to Update transaction status");

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//HERE 
export const updateSaleValue = async (req, res) => {
  const { id } = req.params;
  const { sale, other_expenses } = req.body;
  try {
    const transactoin = await Transaction.findById(id);
    if (!transactoin) throw new Error(`Failed to fetch Transaction`);
    transactoin.sale = Number(sale);
    transactoin.other_expenses = Number(other_expenses);
    await transactoin.save();

    const currentDate = new Date();
    await lineNotify(
      `\nข้อมูล ณ วันที่ : ${currentDate.toLocaleDateString("th-TH", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}\nยอดขาย: ${transactoin.sale}\nต้นทุนทั้งหมด: ${
        transactoin.totalMargin
      }\nกำไร: ${transactoin.sale - transactoin.totalMargin}
      `
    );
    res.status(200).json({ message: "Update Sale of Transaction" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
