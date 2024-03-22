import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createWorkspace,
  getAllWorkspace,
  updateStatus,
  deleteWorkspace,
  getWorkspaceById,
} from "../controllers/workspace.controller.js";

const router = express.Router();

router.get("/getAllWorkspace", verifyToken, getAllWorkspace);
router.get("/:workspace_id", getWorkspaceById);
router.post("/create", verifyToken, createWorkspace);
router.put("/updateStatus/:id", updateStatus);
router.delete("/delete/:id", deleteWorkspace);

export default router;
