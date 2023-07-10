"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _default = {
  secretToken: process.env.SECRET_TOKEN,
  expireInToken: process.env.EXPIRE_IN_TOKEN,
  secretRefreshToken: process.env.SECRET_REFRESH_TOKEN,
  expireRefreshToken: process.env.EXPIRE_REFRESH_TOKEN,
  daysRefreshToken: Number(process.env.DAYS_REFRESH_TOKEN)
};
exports.default = _default;