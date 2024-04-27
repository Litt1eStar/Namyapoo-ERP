import mongoose from "mongoose";
import { dbInventory } from "../../db.js";

const schema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    stock_type: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,  // Format string from product createdAt
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const StockHistory = dbInventory.model("StockHistoyr", schema);

export default StockHistory;