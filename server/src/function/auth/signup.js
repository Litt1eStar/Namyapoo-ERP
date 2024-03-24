import User from "../../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const _signup = async (username, password, res) => {
  const existed = await User.findOne({ username });
  if (existed)
    return res
      .status(400)
      .json({ error: "Invalid Data | This user already in our database" });

  const salt = await bcryptjs.genSalt(10);
  const hashed = await bcryptjs.hash(password, salt);
  const newUser = await User.create({ username, password: hashed });
};
