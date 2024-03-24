import Product from "../../models/product.model.js";

export const getAll = async(user_id, res) => {
    const products = await Product.find({ user_id });
    if (!products)
      return res.status(400).json({ error: "Failed to get all product" });

    return products;
}