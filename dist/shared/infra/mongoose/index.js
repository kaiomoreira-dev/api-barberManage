"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectionMongoDB;
var _AppError = require("../../errors/AppError");
require("dotenv/config");
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable import/export */

async function connectionMongoDB() {
  try {
    const url = process.env.NODE_ENV === "test" ? process.env.MONGODB_URL_DBTEST : process.env.MONGODB_URL_BARBERMANAGE;
    await _mongoose.default.connect(url);
    const {
      connection
    } = _mongoose.default;
    connection.on("open", () => {
      console.log("Conectado ao MongoDB com sucesso!");
    });
    return connection;
  } catch (error) {
    console.log(error.message);
    throw new _AppError.AppError("Erro ao conectar ao MongoDB");
  }
}
connectionMongoDB();