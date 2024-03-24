import Workspace from "../../models/workspace.model.js";

export const _updateStatus = async (id, res) => {
  const workspace = await Workspace.findOne({ _id: id });
  if (!workspace) 
    return res.status(400).json({ error: "workspace not found" });
  workspace.status = !workspace.status;
  await workspace.save();

  return workspace;
};
