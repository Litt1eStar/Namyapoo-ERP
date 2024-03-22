import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
  updateProductAmount,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createProduct);
router.get("/getAllProduct", verifyToken, getAllProduct);
router.put("/edit/:id", editProduct);
router.put("/updateAmount/:id", updateProductAmount)
router.delete("/delete/:id", deleteProduct);

export default router;
