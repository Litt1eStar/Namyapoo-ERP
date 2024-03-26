import Product from "../../models/product.model.js";

export const _deleteProduct = async(id) => {
    const deleted = await Product.findOneAndDelete({ _id: id });
    if (!deleted)
      throw new Error('Failed to delete product');
}