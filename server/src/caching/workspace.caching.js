import redisClient from '../../redisClient.js'

export const workspaceCaching = async (req, res, next) => {
    let result;
    const user_id = req.user.id;
    
    try {
        const cachedData = await redisClient.get(`workspaces:${user_id}`);
        if(cachedData){
            result = JSON.parse(cachedData);
            console.log(result)
            res.status(200).json(result);
        }else{
            next();
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
} 