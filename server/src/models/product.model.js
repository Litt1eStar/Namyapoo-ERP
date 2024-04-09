import mongoose from "mongoose";
import { dbInventory } from "../../db.js";

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    margin_per_unit:{
        type: Number,
        required: true,
        default: 0
    },
    amount:{
        type: Number,
        default: 0
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true})

const Product = dbInventory.model("Product", schema);

export default Product;