import Workspace from "../../models/workspace.model.js";

export const createNewWorkspace = async(name, user_id) => {
    const newWorkspace = await Workspace.create({ name, user_id });
    if (!newWorkspace)
      throw new Error('Failed to create Workspace');

    return newWorkspace;
}