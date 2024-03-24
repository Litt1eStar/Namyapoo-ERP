import Workspace from "../../models/workspace.model.js";

export const createNewWorkspace = async(name, user_id, res) => {
    const newWorkspace = await Workspace.create({ name, user_id });
    if (!newWorkspace)
      return res.status(400).json({ error: "Failed to create Workspace" });

    return newWorkspace;
}