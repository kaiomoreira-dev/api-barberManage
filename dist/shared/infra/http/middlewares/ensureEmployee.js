"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureEmployee = ensureEmployee;
var _UsersRepository = require("../../../../modules/accounts/infra/mongoose/repositories/UsersRepository");
var _AppError = require("../../../errors/AppError");
/* eslint-disable consistent-return */

async function ensureEmployee(request, response, next) {
  try {
    const {
      id
    } = request.user;
    const userRepository = new _UsersRepository.UsersRepository();
    const user = await userRepository.findById(id);
    if (!user.employee) {
      throw new _AppError.AppError("Permission denied!");
    }
    return next();
  } catch (error) {
    throw new _AppError.AppError("User not have permission to access this page", 401);
  }
}