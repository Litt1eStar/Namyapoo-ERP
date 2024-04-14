import redis from "redis";

let redisClient;
var redisPort = 6372;
(async () => {
  redisClient = redis.createClient({
    // host: "https://namyapoo-event-margin-calculator.onrender.com/",
    // port: redisPort,
    url: process.env.REDIS_URL,
    reconnectStrategy: function (retries) {
      if (retries > 20) {
        console.log(
          "Too many attempts to reconnect. Redis connection was terminated"
        );
        return new Error("Too Many retries.");
      } else {
        return retries * 500;
      }
    },
  });

  redisClient.on("ready", () => console.log(`Redis is ready`));
  
  redisClient.on("error", (err) => {
    console.log(`Redis Error : ${err}`);
  });

  await redisClient.connect();
})();

export default redisClient;
