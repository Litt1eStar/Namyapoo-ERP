import Product from "../../models/product.model.js";
import { _create } from "../stockHistory/create.js";
import { formattedDate } from '../../utils/formattedDate.js'
export const _updateAmountByType = async (id, newAmount, type, user_id) => {
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
    console.log(product)
    await _create(
      product.name,
      "Import",
      newAmount,
      formattedDate(product.createdAt),
      user_id
    )

    return product;
}