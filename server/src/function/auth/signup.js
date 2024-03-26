import User from "../../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const _signup = async (username, password) => {
  const existed = await User.findOne({ username });
  if (existed)
    throw new Error('This user already existed in database');

  const salt = await bcryptjs.genSalt(10);
  const hashed = await bcryptjs.hash(password, salt);
  await User.create({ username, password: hashed });
};
