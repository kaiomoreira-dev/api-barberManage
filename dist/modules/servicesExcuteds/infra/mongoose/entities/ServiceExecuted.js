"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ServiceExecutedSchema = void 0;
var _ICreateServiceExecutedDTO = require("../../../dtos/ICreateServiceExecutedDTO");
var _mongodb = require("mongodb");
var _mongoose = require("mongoose");
const ServiceExecutedSchema = new _mongoose.Schema({
  _id: {
    type: _mongodb.ObjectId,
    required: true,
    auto: true
  },
  idClients: {
    type: _mongodb.ObjectId,
    required: true
  },
  idServices: {
    type: [_mongodb.ObjectId],
    required: true
  },
  idCompanys: {
    type: _mongodb.ObjectId,
    required: true
  },
  idUsers: {
    type: _mongodb.ObjectId,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: Object.values(_ICreateServiceExecutedDTO.PaymentMethod),
    required: true
  },
  isLogged: {
    type: _mongodb.ObjectId,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  },
  serviceDate: {
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
exports.ServiceExecutedSchema = ServiceExecutedSchema;
var _default = (0, _mongoose.model)("ServicesExecuteds", ServiceExecutedSchema);
exports.default = _default;