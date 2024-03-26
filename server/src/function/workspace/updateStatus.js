import Workspace from "../../models/workspace.model.js";

export const _updateStatus = async (id) => {
  const workspace = await Workspace.findOne({ _id: id });
  if (!workspace) 
    throw new Error('Workspace not existed');
  workspace.status = !workspace.status;
  await workspace.save();

  return workspace;
};
