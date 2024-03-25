import mongoose from "mongoose";

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
    }
});

const StockHistory = mongoose.model("StockHistoyr", schema);

export default StockHistory;