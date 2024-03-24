import User from "../../models/user.model.js"
import Workspace from "../../models/workspace.model.js"

export const getAllWorkspaceFromDb = async(user_id, res) => {
    const user = await User.findOne({ _id: user_id });
    if (!user)
      return res.status(400).json({ error: "User is not existed on database" });

    const workspaces = await Workspace.find({ user_id });
    if (!workspaces)
      return res.status(400).json({ error: "Failed to get workspace" });

    return workspaces;
}