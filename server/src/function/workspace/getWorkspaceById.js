import Workspace from "../../models/workspace.model.js";

export const _getWorkspaceById = async(workspace_id, res) => {
    const workspace = await Workspace.findById(workspace_id);
    if(!workspace)
      return res.status(400).json({error: "Workspace is not existed on database"})

    return workspace;
}