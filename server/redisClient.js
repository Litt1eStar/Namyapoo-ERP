import redis from 'redis'

let redisClient;

(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (err) => {
        console.log(`Redis Error : ${err}`);
    })

    await redisClient.connect();
})();

export default redisClient;