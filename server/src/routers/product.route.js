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

const router = express.Router();

router.post("/create", verifyToken, createProduct);
router.get("/getAllProduct", verifyToken, getAllProduct);
router.get("/:id", getProductById);
router.put("/edit/:id", editProduct);
router.put("/updateProductAmountByType/:id", updateProductAmountByType)
router.delete("/delete/:id", deleteProduct);

export default router;
