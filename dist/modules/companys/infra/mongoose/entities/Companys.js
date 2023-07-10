"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CompanySchema = void 0;
var _mongodb = require("mongodb");
var _mongoose = require("mongoose");
const CompanySchema = new _mongoose.Schema({
  idUsers: [{
    type: _mongodb.ObjectId,
    ref: "Users",
    required: true
  }],
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
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
exports.CompanySchema = CompanySchema;
var _default = (0, _mongoose.model)("Companys", CompanySchema);
exports.default = _default;