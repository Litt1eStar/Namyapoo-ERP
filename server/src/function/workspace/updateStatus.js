import Workspace from "../../models/workspace.model.js";

export const _updateStatus = async (id, isDone) => {
  const workspace = await Workspace.findOne({ _id: id });
  if (!workspace) throw new Error("Workspace not existed");

  if (isDone) {
    workspace.status = "done";
    await workspace.save();
    return workspace;
  }
  workspace.status = "in_progress";
  await workspace.save();

  return workspace;
};
