import mongoose from "mongoose";
import { dbInventory } from "../../db.js";

const schema = new mongoose.Schema({
    orders: {
        type: mongoose.Schema.Types.Array,
        required: true
    },
    totalMargin: {
        type: Number,
        default: 0
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    area_price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    sale: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const Transaction = dbInventory.model("Transaction", schema)

export default Transaction;