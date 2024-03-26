import { _login } from "../function/auth/login.js";
import { _signup } from "../function/auth/signup.js";

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

    if(!username || !password)
        return res.status(400).json({error: "Please complete all field"})

    try {
        const token = await _login(username, password);
        res.cookie("token", token);
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}