import Product from "../../models/product.model.js";

export const edit = async(id, n_name, n_margin, n_amount, res) => {
    const product = await Product.findOne({ _id: id });
    if (!product) 
        return res.status(400).json({ error: "Product not found" });
    product.name = n_name;
    product.margin_per_unit = n_margin;
    product.amount = n_amount;
    await product.save();

    return product;
}