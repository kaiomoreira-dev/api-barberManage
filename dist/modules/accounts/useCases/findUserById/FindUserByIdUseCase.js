"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindUserByIdUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _UserMap = require("../../mappers/UserMap");
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let FindUserByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindUserByIdUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(id) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("User not found", 401);
    }
    const checkUserExists = await this.userRepository.findById(id);
    if (!checkUserExists) {
      throw new _AppError.AppError("User not found", 404);
    }
    return _UserMap.UserMap.toDTO(checkUserExists);
  }
}) || _class) || _class) || _class) || _class);
exports.FindUserByIdUseCase = FindUserByIdUseCase;