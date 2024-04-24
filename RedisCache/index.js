const express = require("express");
const redis = require("redis");

//Initiate app
const app = express();
const port = 3001;

// ##### REDIS #####
// Default port and host : 6379, 127.0.0.1

// Create a Redis client
const redisClient = redis.createClient({
  host: "localhost", // Redis host: "127.0.0.1",
  port: 6379, // Redis port
});

// Handle connection error
redisClient
  .on("error", (err) => {
    console.error("Error:", err);
  })
  .on("connect", () => {
    console.log("Redis Connected");
  })
  .connect();

// Create a route
app.get("/api/home", async (req, res) => {
  const dataInstance = {
    id: 1,
    title: "Redis Cache",
    description:
      "Redis is an open-source, in-memory data structure store, used as a database, cache, and message broker. ",
  };

  // Set-Up Redis connection
  const keyName = "homeKey";
  //   const getCacheData = await redisClient.get(keyName, async (err, data) => {
  //     if (err) throw err;

  //     // If data exist in a cache
  //     if (data) {
  //       // Convert string to json object
  //       return JSON.parse(data);
  //     }
  //   });

  const getCacheData = await redisClient.get(keyName);

  let responseInstance = "";
  if (getCacheData) {
    console.log("GET Cache");
    responseInstance = JSON.parse(getCacheData);
  } else {
    console.log("SET Cache");

    // Redis key type should be string
    // We can set Expiry time for Cache data : EX:30 sec
    await redisClient.set(keyName, JSON.stringify(dataInstance), { EX: 30 });
    responseInstance = dataInstance;
  }

  res.status(200).send({ data: responseInstance });
});

app.get("/api/redis-hash", async (req, res) => {
  const dataInstance = {
    id: 1,
    title: "Redis Hash",
    description: "We can cache multiple key value in a single parent key",
  };

  // Set-Up Redis Hash connection
  const parentKey = "homePage";
  const keyName = "firstKey";

  const getCacheData = await redisClient.hGet(parentKey, keyName);

  // Get all parent key cache data
  // const getAll = await redisClient.hGetAll(parentKey);

  // Get only value of parent key
  //   const value = await redisClient.hVals(parentKey);
  //   console.log("value", value);

  let responseInstance = "";
  if (getCacheData) {
    console.log("GET Cache");
    responseInstance = JSON.parse(getCacheData);
  } else {
    console.log("SET Cache");

    // Redis key type should be string
    // We can set Expiry time for Cache data : EX:30 sec
    await redisClient.hSet(parentKey, keyName, JSON.stringify(dataInstance));
    responseInstance = dataInstance;
  }
  // To Delete cache data from redis server
  // redisClient.DEL(parentKey)
  
  res.status(200).send({ data: responseInstance });
});

app.listen(port, () => {
  console.info(`Server is running on PORT: ${port}`);
});
