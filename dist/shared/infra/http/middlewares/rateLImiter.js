"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;
var _redisClient = require("../../../../config/redisClient");
var _rateLimiterFlexible = require("rate-limiter-flexible");
var _AppError = require("../../../errors/AppError");
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: _redisClient.redisClient,
  keyPrefix: "rateLimiter",
  points: 8,
  // 10 requests
  duration: 3 // per 1 second by IP
});

async function rateLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new _AppError.AppError("To many Requests not permited", 429);
  }
}