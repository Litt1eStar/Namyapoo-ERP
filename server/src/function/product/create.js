import Product from "../../models/product.model.js";
import User from "../../models/user.model.js";
export const create = async (user_id, name, margin_per_unit, res) => {
  const user = await User.findOne({ _id: user_id });
  if (!user) return res.status(400).json({ error: "User not found" });

  const existed = await Product.findOne({ name, user_id });
  if (existed) return res.status(400).json({ error: "Data already existed" });

  const newProduct = await Product.create({ name, margin_per_unit, user_id });
  if (!newProduct)
    return res.status(400).json({ error: "Failed to create new product" });

  return newProduct;
};
