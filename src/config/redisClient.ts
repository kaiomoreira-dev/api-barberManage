/* eslint-disable import/no-extraneous-dependencies */
import { createClient } from "redis";

export const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.ping();
