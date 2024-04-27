import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
  updateProductAmountByType,
  getProductById,
} from "../controllers/product.controller.js";
import { productCaching } from "../caching/product.caching.js";
const router = express.Router();

router.post("/create", verifyToken, createProduct);
router.get("/getAllProduct",  verifyToken, productCaching, getAllProduct);
router.get("/:id", verifyToken, getProductById);
router.put("/edit/:id", verifyToken, editProduct);
router.put("/updateProductAmountByType/:id", verifyToken, updateProductAmountByType)
router.delete("/delete/:id", verifyToken, deleteProduct);

export default router;
