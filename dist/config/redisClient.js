"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisClient = void 0;
var _redis = require("redis");
/* eslint-disable import/no-extraneous-dependencies */

const redisClient = (0, _redis.createClient)({
  host: process.env.NODE_ENV === "test" ? "localhost" : process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
});
exports.redisClient = redisClient;
redisClient.on("error", err => console.log("Redis Client Error", err));