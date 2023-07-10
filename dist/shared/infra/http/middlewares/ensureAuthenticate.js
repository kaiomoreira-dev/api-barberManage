"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticate = ensureAuthenticate;
var _auth = _interopRequireDefault(require("../../../../config/auth"));
var _UsersRepository = require("../../../../modules/accounts/infra/mongoose/repositories/UsersRepository");
var _jsonwebtoken = require("jsonwebtoken");
var _AppError = require("../../../errors/AppError");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-restricted-syntax */

async function ensureAuthenticate(request, response, next) {
  // destruturar do headers o toke
  const authHeader = request.headers.authorization;

  // validar no if pra ve se existe
  if (!authHeader) {
    throw new _AppError.AppError("Miss token", 401);
  }
  // destruturar o token de dentro do authHeader
  const [, token] = authHeader.split(" ");
  // verificar no verify o token
  // retirar de dentro do verify o id do user que esta no token
  try {
    const userRepository = new _UsersRepository.UsersRepository();
    const {
      sub: idUsers
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secretToken);
    const user = await userRepository.findById(idUsers);
    if (!user) {
      throw new _AppError.AppError("User not found", 401);
    }
    request.user = {
      id: idUsers
    };
    next();
  } catch {
    throw new _AppError.AppError("Invalid token", 401);
  }
}