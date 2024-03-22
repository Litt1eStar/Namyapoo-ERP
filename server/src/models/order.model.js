import mongoose from "mongoose";

const schema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    product_name:{
        type: String,
        required: true
    },
    margin_per_unit:{
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    totalMargin:{
        type: Number,
        required: true,
        default: 0
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});

const Order = mongoose.model("Order", schema);

export default Order;