"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisClient = void 0;
var _redis = require("redis");
/* eslint-disable import/no-extraneous-dependencies */

const redisClient = (0, _redis.createClient)({
  url: process.env.REDIS_URL
});
exports.redisClient = redisClient;
redisClient.on("error", err => console.log("Redis Client Error", err));
redisClient.ping();