import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({error: "Unauthorize"})
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        if(!user) return res.status(401).json({error: "Unauthorize"})
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({error: error.message})
        next();
    }
}