"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientSchema = void 0;
var _ICreateClientDTO = require("../../../dtos/ICreateClientDTO");
var _mongodb = require("mongodb");
var _mongoose = require("mongoose");
const ClientSchema = new _mongoose.Schema({
  idCompanys: {
    type: _mongodb.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  debit: {
    type: Number,
    required: false,
    default: 0
  },
  num: {
    type: Number,
    required: false
  },
  military: {
    type: Boolean,
    required: true,
    default: false
  },
  pg: {
    type: String,
    enum: Object.values(_ICreateClientDTO.Pg),
    required: false
  },
  esqd: {
    type: String,
    enum: Object.values(_ICreateClientDTO.Esqd),
    required: false
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
exports.ClientSchema = ClientSchema;
var _default = (0, _mongoose.model)("Clients", ClientSchema);
exports.default = _default;