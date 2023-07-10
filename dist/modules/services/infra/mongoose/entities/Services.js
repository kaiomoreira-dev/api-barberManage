"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ServiceSchema = void 0;
var _mongodb = require("mongodb");
var _mongoose = require("mongoose");
const ServiceSchema = new _mongoose.Schema({
  idCompanys: {
    type: _mongodb.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
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
exports.ServiceSchema = ServiceSchema;
var _default = (0, _mongoose.model)("Services", ServiceSchema);
exports.default = _default;