import Product from "../../models/product.model.js";
import User from "../../models/user.model.js";
export const create = async (user_id, name, margin_per_unit) => {
  const user = await User.findOne({ _id: user_id });
  if (!user)
    throw new Error('User not found')

  const existed = await Product.findOne({ name, user_id });
  if (existed)
    throw new Error('This Product is already created')

  const newProduct = await Product.create({ name, margin_per_unit, user_id });
  if (!newProduct)
    throw new Error('Failed to create new Product');

  return newProduct;
};
