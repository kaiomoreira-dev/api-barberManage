"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CostSchema = void 0;
var _mongodb = require("mongodb");
var _mongoose = require("mongoose");
const CostSchema = new _mongoose.Schema({
  idCompanys: {
    type: _mongodb.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  costDate: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
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
exports.CostSchema = CostSchema;
var _default = (0, _mongoose.model)("Costs", CostSchema);
exports.default = _default;