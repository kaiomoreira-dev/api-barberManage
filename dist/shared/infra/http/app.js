"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
require("dotenv/config");
require("reflect-metadata");
require("express-async-errors");
var _AppError = require("../../errors/AppError");
require("../../container");
var _routes = require("./routes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable import/no-extraneous-dependencies */

const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use(_routes.router);
app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server - error: ${err.message}`
  });
});