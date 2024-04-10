import Transaction from "../../models/transaction.model.js";

export const _updateStatus = async (id) => {
    const transaction = await Transaction.findById(id);      
    transaction.status = true;
    await transaction.save();

    return transaction;
}