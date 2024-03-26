import Product from "../../models/product.model.js";

export const _updateAmountByType = async (id, newAmount, type) => {
    const product = await Product.findById(id);
    switch (type) {
      case "import":
        product.amount += newAmount;
        break;
      case "export":
        product.amount -= newAmount;
        break;
      default:
        throw new Error('Invalid operation type')
    }
    await product.save();

    return product;
}