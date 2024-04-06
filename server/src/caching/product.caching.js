import redisClient from '../../redisClient.js'

export const productCaching = async (req, res, next) => {
    let result;
    const user_id = req.user.id;
    try {
        const cachedData = await redisClient.get(`products:${user_id}`);
        if(cachedData){
            result = JSON.parse(cachedData);
            res.status(200).json(result);
        }else{
            next();
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
} 