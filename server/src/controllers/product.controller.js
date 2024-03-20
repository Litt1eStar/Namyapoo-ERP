import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const createProduct = async (req, res) => {
  const user_id = req.user.id;
  const { name, margin_per_unit } = req.body;

  if (!user_id) return res.status(401).json({ error: "Unauthorize" });
  if (!name || !margin_per_unit)
    return res.status(400).json({ error: "Please complete all field" });

  try {
    const user = await User.findOne({ _id: user_id });
    if (!user) return res.status(400).json({ error: "User not found" });
    const existed = await Product.findOne({ name, user_id });
    if (existed) return res.status(400).json({ error: "Data already existed" });

    const newProduct = await Product.create({ name, margin_per_unit, user_id });
    if (!newProduct)
      return res.status(400).json({ error: "Failed to create new product" });

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllProduct = async (req, res) => {
  const user_id = req.user.id;

  if (!user_id) return res.status(401).json({ error: "Unauthorize" });

  try {
    const products = await Product.find({ user_id });
    if (!products)
      return res.status(400).json({ error: "Failed to get all product" });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { n_name, n_margin } = req.body;
  if (!id)
    return res.status(400).json({ error: "Invalid Data | product id is null" });

  try {
    const product = await Product.findOne({ _id: id });
    if (!product) return res.status(400).json({ error: "Product not found" });
    product.name = n_name;
    product.margin_per_unit = n_margin;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ error: "Invalid Data | product id is null" });

  try {
    const deleted = await Product.findOneAndDelete({ _id: id });
    if (!deleted)
      return res.status(400).json({ error: "Failed to delete product" });
    res.status(200).json({ message: "Successfully delete product" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
