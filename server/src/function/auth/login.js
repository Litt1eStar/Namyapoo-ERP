import User from "../../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const _login = async(username, password, res) => {
    const existed = await User.findOne({ username });
    if(!existed)
        return res.status(401).json({error: "User not existed"});

    const match = await bcryptjs.compare(password, existed.password);
    if(!match)
         return res.status(401).json({error: "Password is not correct"})

    const token = jwt.sign({id: existed._id}, process.env.JWT_SECRET);

    return token;
}