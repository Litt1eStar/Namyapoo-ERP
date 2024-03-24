import Product from "../../models/product.model.js";

export const _deleteProduct = async(id, res) => {
    const deleted = await Product.findOneAndDelete({ _id: id });
    if (!deleted)
      return res.status(400).json({ error: "Failed to delete product" });
}