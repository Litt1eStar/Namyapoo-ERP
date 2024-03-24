import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { _signup } from "../function/user/signup.js";

export const signup = async(req, res) => {
    const { username, password, confirmPassword } = req.body;

    if(!username || !password || !confirmPassword)
        return res.status(400).json({error: "Please complete all field"})

    if(password !== confirmPassword)
        return res.status(400).json({error: "Password is not match"});
    
    try {
        await _signup(username, password);
        res.status(200).json({message: "User created"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const login = async(req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({error: "Please complete all field"})
    }

    try {
        const existed = await User.findOne({ username });
        if(!existed){
            return res.status(401).json({error: "User not existed"});
        }

        const match = await bcryptjs.compare(password, existed.password);
        
        if(!match) return res.status(401).json({error: "Password is not correct"})

        const token = jwt.sign({id: existed._id}, process.env.JWT_SECRET);

        res.cookie("token", token);
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}