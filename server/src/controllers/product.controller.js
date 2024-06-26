import { create } from "../function/product/create.js";
import { _deleteProduct } from "../function/product/delete.js";
import { edit } from "../function/product/edit.js";
import { getAll } from "../function/product/getAll.js";
import { _updateAmountByType } from "../function/product/updateAmountByType.js";

import redisClient from "../../redisClient.js";
import Product from "../models/product.model.js";

const updateCache = async(user_id) => {
  try {
    const products = await getAll(user_id);
    await redisClient.set(`products:${user_id}`, JSON.stringify(products));
  } catch (error) {
    console.log(`Error updating cache : ${error}`);
  }
}

export const createProduct = async (req, res) => {
  const user_id = req.user.id;
  const { name, margin_per_unit } = req.body;

  if (!user_id) 
    return res.status(401).json({ error: "Unauthorize" });
  if (!name || !margin_per_unit)
    return res.status(400).json({ error: "Please complete all field" });

  try {
    const newProduct = await create(user_id, name, margin_per_unit);
    await updateCache(user_id);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllProduct = async (req, res) => {
  const user_id = req.user.id;

  if (!user_id) return res.status(401).json({ error: "Unauthorize" });

  try {
    const products = await getAll(user_id);
    await redisClient.set(`products:${user_id}`, JSON.stringify(products));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { n_name, n_margin, n_amount } = req.body;
  const user_id = req.user.id;
  if (!id)
    return res.status(400).json({ error: "Invalid Data | product id is null" });

  try {
    const product = await edit(id, n_name, n_margin, n_amount);
    await updateCache(user_id)
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  if (!id)
    return res.status(400).json({ error: "Invalid Data | product id is null" });

  try {
    await _deleteProduct(id);
    await updateCache(user_id)
    res.status(200).json({ message: "Successfully delete product" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateProductAmountByType = async (req, res) => {
  const { type, newAmount } = req.body;
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const product = await _updateAmountByType(id, newAmount, type, user_id);
    await updateCache(user_id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getProductById = async(req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const product = await Product.findById(id);
    await updateCache(user_id)
    res.json(product)
  } catch (error) {
    
  }
}