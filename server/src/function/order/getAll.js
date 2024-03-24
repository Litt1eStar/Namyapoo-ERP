import Order from "../../models/order.model.js";

export const getAll = async(workspace_id, res) => {
    const orders = await Order.find({ workspace_id });
    if (!orders) 
        return res.status(400).json({ error: "Failed to get orders" });
    
    return orders;
}