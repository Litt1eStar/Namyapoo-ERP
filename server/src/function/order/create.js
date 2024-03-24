import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
export const create = async (
  product_id,
  product_name,
  margin_per_unit,
  quantity,
  workspace_id,
  res
) => {
  const product = await Product.findById(product_id);
  if (!product) return res.status(400).json({ error: "Product not found" });

  const enough = product.amount - quantity >= 0;
  if (!enough)
    return res
      .status(400)
      .json({ error: "Product in Inventory is not enough" });

  const order = await Order.create({
    product_id,
    product_name,
    margin_per_unit,
    quantity,
    totalMargin: margin_per_unit * quantity,
    workspace_id,
  });
  if (!order) return res.status(400).json({ error: "Failed to create order" });
  
  return order;
};
