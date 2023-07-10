"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCompanyByIdUseCase = void 0;
var _ensureAddress = require("../../../../ensures/ensureAddress");
var _ensureId = require("../../../../ensures/ensureId");
var _ensureName = require("../../../../ensures/ensureName");
var _ensurePhone = require("../../../../ensures/ensurePhone");
var _ICompanysRepository = require("../../repositories/ICompanysRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
/* eslint-disable import/no-unresolved */
let UpdateCompanyByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateCompanyByIdUseCase {
  constructor(companysRepository) {
    this.companysRepository = companysRepository;
  }
  async execute({
    id,
    address,
    name,
    phone
  }) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("Company not found", 404);
    }
    const checkCompanyExist = await this.companysRepository.findById(id);
    if (!checkCompanyExist) {
      throw new _AppError.AppError("Company not found", 404);
    }
    if (!(0, _ensureName.ensureName)(name)) {
      throw new _AppError.AppError("Name is not available", 401);
    }
    if (!(0, _ensureAddress.ensureAddress)(address)) {
      throw new _AppError.AppError("address is not available", 401);
    }

    // add test for phone in jest
    if (!(0, _ensurePhone.ensurePhone)(phone)) {
      throw new _AppError.AppError("phone is not available", 401);
    }
    await this.companysRepository.updateById({
      id,
      name,
      address,
      phone
    });
  }
}) || _class) || _class) || _class) || _class);
exports.UpdateCompanyByIdUseCase = UpdateCompanyByIdUseCase;