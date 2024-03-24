import Workspace from "../../models/workspace.model.js";

export const _deleteWorkspace = async (id, res) => {
  const deleted = await Workspace.findOneAndDelete({ _id: id });
  if (!deleted)
    return res.status(400).json({ error: "Failed to delete workspace" });
};
