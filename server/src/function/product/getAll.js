import Product from "../../models/product.model.js";

export const getAll = async(user_id) => {
    const products = await Product.find({ user_id });
    if (!products)
      throw new Error('Failed to get all product');

    return products;
}