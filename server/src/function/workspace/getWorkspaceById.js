import Workspace from "../../models/workspace.model.js";

export const _getWorkspaceById = async(workspace_id) => {
    const workspace = await Workspace.findById(workspace_id);
    if(!workspace)
      throw new Error('Workspace is not existed on database');

    return workspace;
}