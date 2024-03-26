import User from "../../models/user.model.js"
import Workspace from "../../models/workspace.model.js"

export const getAllWorkspaceFromDb = async(user_id) => {
    const user = await User.findOne({ _id: user_id });
    if (!user)
      throw new Error('User is not existed in database')

    const workspaces = await Workspace.find({ user_id });
    if (!workspaces)
      throw new Error('Failed to get workspaces')

    return workspaces;
}