import User from "../../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const _login = async(username, password) => {
    const existed = await User.findOne({ username });
    if(!existed)
        throw new Error('User not existed on Database')

    const match = await bcryptjs.compare(password, existed.password);
    if(!match)
         throw new Error('User credential not correct')

    const token = jwt.sign({id: existed._id}, process.env.JWT_SECRET);
    return token;
}