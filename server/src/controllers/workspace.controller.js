import Workspace from "../models/workspace.model.js";
import User from "../models/user.model.js";
import { createNewWorkspace } from "../function/workspace/createNewWorkspace.js";
import { getAllWorkspaceFromDb } from "../function/workspace/getAllWorkspaceFromDb.js";

// CREATE NEW WORKSPACE
export const createWorkspace = async (req, res) => {
  const user_id = req.user.id;
  const { name } = req.body;

  if (!user_id) 
    return res.status(401).json({ error: "Unauthorize" });

  try {
    const newWorkspace = await createNewWorkspace(name, user_id, res);
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
    const workspaces = await getAllWorkspaceFromDb(user_id, res);
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWorkspaceById = async(req, res) => {
  const {workspace_id} = req.params;

  if(!workspace_id) return;

  try {
    const workspace = await Workspace.findById(workspace_id);
    if(!workspace)
      return res.status(400).json({error: "Workspace is not existed on database"})

      res.status(200).json(workspace)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}
//UPDATE STATUS OF WORKSPACE
export const updateStatus = async (req, res) => {
    const { id } = req.params;

    if(!id) return res.status(400).json({error: "Invalid Data | workspace id is invalid"})

    try {
        const workspace = await Workspace.findOne({ _id: id })
        if(!workspace) return res.status(400).json({error: "workspace not found"})
        workspace.status = !workspace.status;
        await workspace.save();
        res.status(200).json({updated: workspace})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//DELETE WORKSPACE
export const deleteWorkspace = async (req, res) => {
    const { id } = req.params;

    if(!id) return res.status(400).json({error: "Invalid Data | workspace id is invalid"})

    try {
        const deleted = await Workspace.findOneAndDelete({ _id: id});
        if(!deleted) return res.status(400).json({error: "Failed to delete workspace"})
        res.status(200).json({message: "Succesfully delete workspace"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
