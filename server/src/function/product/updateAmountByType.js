import Product from "../../models/product.model.js";

export const _updateAmountByType = async (id, newAmount, type, res) => {
    const product = await Product.findById(id);
    switch (type) {
      case "import":
        product.amount += newAmount;
        break;
      case "export":
        product.amount -= newAmount;
        break;
      default:
        return res.status(400).json({ error: "Invalid operation type" });
    }
    await product.save();

    return product;
}