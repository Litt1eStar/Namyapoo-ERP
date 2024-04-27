import redisClient from "../../redisClient.js"
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import StockHistory from "../models/stockHistory.model.js";
import Transaction from "../models/transaction.model.js";
import Workspace from "../models/workspace.model.js";

export const updateCache = async(modelType, key, user_id) => {
    const data = await fetchFromDB(modelType, user_id);
    console.log(`Current Model: ${modelType} | key: ${key}`);    
    
    await redisClient.set(`${key}:${user_id}`, JSON.stringify(data));
}

const fetchFromDB = async(modelType, user_id) => {
    switch(modelType){
        case "Workspace": 
            const workspace_data = await Workspace.find({ user_id });
            return workspace_data;
        case "Order":
            const order_data = await Order.find({ workspace_id: user_id });
            return order_data
        case "Product":
            const product_data = await Product.find({ user_id });
            return product_data;
        case "Transaction":
            const transaction_data = await Transaction.find({ user_id });
            return transaction_data;
        case "StockHistory":
            const stockHistory_data = await StockHistory.find({ user_id })
            return stockHistory_data;
    }
}