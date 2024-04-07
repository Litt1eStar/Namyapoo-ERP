import redisClient from "../../redisClient.js";
import { createNewWorkspace } from "../function/workspace/createNewWorkspace.js";
import { getAllWorkspaceFromDb } from "../function/workspace/getAllWorkspaceFromDb.js";
import { _getWorkspaceById } from "../function/workspace/getWorkspaceById.js";
import { _updateStatus } from "../function/workspace/updateStatus.js";
import { _deleteWorkspace } from "../function/workspace/deleteWorkspace.js";
import { updateCache } from "../utils/updateCache.js";

// CREATE NEW WORKSPACE
export const createWorkspace = async (req, res) => {
  const user_id = req.user.id;
  const { name } = req.body;

  if (!user_id) 
    return res.status(401).json({ error: "Unauthorize" });

  try {
    const newWorkspace = await createNewWorkspace(name, user_id);
    await updateCache("Workspace", "workspaces", user_id);
    res.status(200).json(newWorkspace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL WORKSPACE BASED ON USER
export const getAllWorkspace = async (req, res) => {
  const user_id = req.user.id;
  
  if (!user_id) 
    return res.status(401).json({ error: "Unauthorize" });

  try {
    const workspaces = await getAllWorkspaceFromDb(user_id);
    await redisClient.set(`workspaces:${user_id}`, JSON.stringify(workspaces));
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWorkspaceById = async(req, res) => {
  const {workspace_id} = req.params;

  if(!workspace_id) return;

  try {
      const workspace = await _getWorkspaceById(workspace_id);
      res.status(200).json(workspace)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}
//UPDATE STATUS OF WORKSPACE
export const updateStatus = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    if(!id) return res.status(400).json({error: "Invalid Data | workspace id is invalid"})

    try {
        const workspace = await _updateStatus(id)
        await updateCache("Workspace", "workspaces", user_id);
        res.status(200).json({updated: workspace})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//DELETE WORKSPACE
export const deleteWorkspace = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    if(!id) return res.status(400).json({error: "Invalid Data | workspace id is invalid"})

    try {
        await _deleteWorkspace(id);
        await updateCache("Workspace", "workspaces", user_id);
        res.status(200).json({message: "Succesfully delete workspace"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
