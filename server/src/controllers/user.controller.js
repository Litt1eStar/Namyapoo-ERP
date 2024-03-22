import User from "../models/user.model.js";

export const getUesr = async(req, res) => {
    const user_id = req.user.id;
    try {
        const user = await User.findById(user_id);
        if(!user) return res.status(400).json({error: "User not existed"})
        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}