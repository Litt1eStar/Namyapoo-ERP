import Product from "../../models/product.model.js";

export const edit = async(id, n_name, n_margin, n_amount) => {
    const product = await Product.findOne({ _id: id });
    if (!product) 
        throw new Error('Product not found')
    
    product.name = n_name;
    product.margin_per_unit = n_margin;
    product.amount = n_amount;
    await product.save();

    return product;
}