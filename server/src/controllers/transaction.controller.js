import Order from "../models/order.model.js";

export const createTransactoin = async(req, res) => {
    const user_id = req.user.id;
    const orders = req.body;
}

export const getTransaction = async(req, res) => {
    const user_id = req.user.id;
    
}