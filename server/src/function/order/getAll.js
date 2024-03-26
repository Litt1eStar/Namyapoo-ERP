import Order from "../../models/order.model.js";

export const getAll = async(workspace_id) => {
    const orders = await Order.find({ workspace_id });
    if (!orders) 
        throw new Error('Failed to get All orders');
    
    return orders;
}