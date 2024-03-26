import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
export const create = async (
  product_id,
  product_name,
  margin_per_unit,
  quantity,
  workspace_id,
) => {
  const product = await Product.findById(product_id);
  if (!product)
    throw new Error('Product not existed');

  const enough = product.amount - quantity >= 0;
  if (!enough)
    throw new Error('Product is not enough');

  const order = await Order.create({
    product_id,
    product_name,
    margin_per_unit,
    quantity,
    totalMargin: margin_per_unit * quantity,
    workspace_id,
  });
  if (!order)
    throw new Error('Failed to create new Order');
  
  return order;
};
