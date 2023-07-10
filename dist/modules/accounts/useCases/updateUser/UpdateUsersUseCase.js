"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUsersUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
let UpdateUsersUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUsersUseCase {
  constructor(userRepository, companysRepository) {
    this.userRepository = userRepository;
    this.companysRepository = companysRepository;
  }
  async execute({
    id,
    name,
    email,
    address,
    phone,
    idCompanys
  }) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("User not found", 401);
    }
    const checkUserdExists = this.userRepository.findById(id);
    if (!checkUserdExists) {
      throw new _AppError.AppError("User not found", 404);
    }
    for (const company of idCompanys) {
      const checkCompanyExists = await this.companysRepository.findById(String(company));
      if (!checkCompanyExists) {
        throw new _AppError.AppError("Company not found", 404);
      }
    }
    await this.userRepository.updateById({
      id,
      name,
      email,
      address,
      phone,
      idCompanys
    });
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUsersUseCase = UpdateUsersUseCase;