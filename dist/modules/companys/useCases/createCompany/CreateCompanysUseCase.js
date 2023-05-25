"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCompanysUseCase = void 0;
var _ensureName = require("../../../accounts/ensures/ensureName");
var _ensureAddress = require("../../ensures/ensureAddress");
var _ensurePhone = require("../../ensures/ensurePhone");
var _ICompanysRepository = require("../../repositories/ICompanysRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let CreateCompanysUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCompanysUseCase {
  constructor(companysRepository, usersRepository) {
    this.companysRepository = companysRepository;
    this.usersRepository = usersRepository;
  }
  async execute({
    idUsers,
    address,
    name,
    phone
  }) {
    if ((0, _ensureName.ensureName)(name)) {
      throw new _AppError.AppError("Name is not available", 401);
    }
    const checkCompanyExists = await this.companysRepository.findByName(name);
    if (checkCompanyExists) {
      throw new _AppError.AppError("Company already exists", 401);
    }
    if (!(0, _ensureAddress.ensureAddress)(address)) {
      throw new _AppError.AppError("adress is not available", 401);
    }

    // add test for phone in jest
    if (!(0, _ensurePhone.ensurePhone)(phone)) {
      throw new _AppError.AppError("phone is not available", 401);
    }
    const checkUserExist = await this.usersRepository.findById(idUsers);
    if (!checkUserExist) {
      throw new _AppError.AppError("User not found", 404);
    }
    const company = await this.companysRepository.create({
      idUsers,
      name,
      address,
      phone
    });
    return company;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.CreateCompanysUseCase = CreateCompanysUseCase;