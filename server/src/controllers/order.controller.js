import redisClient from "../../redisClient.js";
import { create } from "../function/order/create.js";
import { getAll } from "../function/order/getAll.js";
import { updateCache } from "../utils/updateCache.js";

export const createOrder = async (req, res) => {
  const { product_id, product_name, margin_per_unit, quantity } = req.body;
  const { workspace_id } = req.params;
  const user_id = req.user.id;

  if (!product_name || !margin_per_unit || !quantity)
    return res.status(400).json({ error: "Please complete all field" });

  if (!workspace_id)
    return res.status(400).json({ error: "Workspace not found" });

  try {
    const order = await create(
      product_id,
      product_name,
      margin_per_unit,
      quantity,
      workspace_id, 
    );
    await updateCache("Order", "orders", workspace_id)
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrder = async (req, res) => {
  const { workspace_id } = req.params;
  console.log(workspace_id)
  if (!workspace_id)
    return res.status(400).json({ error: "Workspace not found" });

  try {
    const cachedData = await redisClient.get(`orders:${workspace_id}`);
    if(cachedData){
      let result = JSON.parse(cachedData)
      res.status(200).json(result);
    }else{
      const orders = await getAll(workspace_id);
      await redisClient.set(`orders:${workspace_id}`, JSON.stringify(orders))
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
