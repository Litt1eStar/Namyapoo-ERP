import Order from '../models/order.model.js'

export const createOrder = async(req, res) => {
    const { product_id, quantity } = req.body;
    const {workspace_id} = req.params;
    
    if(!product_id || !quantity)
        return res.status(400).json({error: "Please complete all field"})

    if(!workspace_id) 
        return res.status(400).json({error: "Workspace not found"})

    try {
        const order = await Order.create({ product_id, quantity, workspace_id });
        if(!order)
            return res.status(400).json({error: "Failed to create order"})

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getAllOrder = async(req,res)=>{
    const { workspace_id } = req.params;

    if(!workspace_id) 
        return res.status(400).json({error: "Workspace not found"})

    try {
        const orders = await Order.find({ workspace_id });
        if(!orders)
            return res.status(400).json({error: "Failed to get orders"})

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}