import Workspace from "../../models/workspace.model.js";

export const _deleteWorkspace = async (id) => {
  const deleted = await Workspace.findOneAndDelete({ _id: id });
  if (!deleted)
    throw new Error('Failed to delete workspace');
};
