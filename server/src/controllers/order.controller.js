import Order from "../models/order.model.js";
import Product from '../models/product.model.js'

export const createOrder = async (req, res) => {
  const { product_id ,product_name, margin_per_unit, quantity } = req.body;
  const { workspace_id } = req.params;

  if (!product_name || !margin_per_unit || !quantity)
    return res.status(400).json({ error: "Please complete all field" });

  if (!workspace_id)
    return res.status(400).json({ error: "Workspace not found" });

  try {
    const product = await Product.findById(product_id)
    if(!product)
      return res.status(400).json({error: "Product not found"});

    const enough = (product.amount - quantity) >= 0;
    if(!enough)
      return res.status(400).json({error: "Product in Inventory is not enough"})
    
    const order = await Order.create({
      product_id,
      product_name,
      margin_per_unit,
      quantity,
      totalMargin: margin_per_unit * quantity,
      workspace_id,
    });
    if (!order)
      return res.status(400).json({ error: "Failed to create order" });
    console.log(order)
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrder = async (req, res) => {
  const { workspace_id } = req.params;

  if (!workspace_id)
    return res.status(400).json({ error: "Workspace not found" });

  try {
    const orders = await Order.find({ workspace_id });
    if (!orders) return res.status(400).json({ error: "Failed to get orders" });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
