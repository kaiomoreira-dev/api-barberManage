"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserSchema = void 0;
var _mongoose = require("mongoose");
/* eslint-disable @typescript-eslint/naming-convention */

const UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  admin: {
    type: Boolean,
    default: false
  },
  employee: {
    type: Boolean,
    default: true
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
exports.UserSchema = UserSchema;
var _default = (0, _mongoose.model)("Users", UserSchema);
exports.default = _default;