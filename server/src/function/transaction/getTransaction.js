import Transaction from "../../models/transaction.model.js";

export const _getTransaction = async(user_id, res) => {
    const transactions = await Transaction.find({ user_id });
    if (!transactions)
      return res.status(400).json({ error: "Transaction not found" });

    return transactions;
}