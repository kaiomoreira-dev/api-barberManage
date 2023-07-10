"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RefreshTokensSchema = void 0;
var _mongodb = require("mongodb");
var _mongoose = require("mongoose");
const RefreshTokensSchema = new _mongoose.Schema({
  idUsers: {
    type: _mongodb.ObjectId,
    ref: "Users",
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  expireDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
exports.RefreshTokensSchema = RefreshTokensSchema;
var _default = (0, _mongoose.model)("RefreshTokens", RefreshTokensSchema);
exports.default = _default;