import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createWorkspace,
  getAllWorkspace,
  updateStatus,
  deleteWorkspace,
  getWorkspaceById,
} from "../controllers/workspace.controller.js";
import { workspaceCaching } from "../caching/workspace.caching.js";

const router = express.Router();

router.get("/getAllWorkspace", verifyToken, workspaceCaching, getAllWorkspace);
router.get("/:workspace_id", getWorkspaceById);
router.post("/create", verifyToken, createWorkspace);
router.put("/updateStatus/:id", verifyToken,updateStatus);
router.delete("/delete/:id",verifyToken, deleteWorkspace);

export default router;
