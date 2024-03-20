import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createWorkspace,
  getAllWorkspace,
  updateStatus,
  deleteWorkspace,
} from "../controllers/workspace.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createWorkspace);
router.get("/getAllWorkspace", verifyToken, getAllWorkspace);
router.put("/updateStatus/:id", updateStatus);
router.delete("/delete/:id", deleteWorkspace);

export default router;
