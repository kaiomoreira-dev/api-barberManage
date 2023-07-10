"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateServiceUseCase = void 0;
var _ensureDescription = require("../../../../ensures/ensureDescription");
var _ensureId = require("../../../../ensures/ensureId");
var _ensureName = require("../../../../ensures/ensureName");
var _ensurePrice = require("../../../../ensures/ensurePrice");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _IServicesRepository = require("../../repositories/IServicesRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
/* eslint-disable import/no-unresolved */
let CreateServiceUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ServicesRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository, typeof _IServicesRepository.IServicesRepository === "undefined" ? Object : _IServicesRepository.IServicesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateServiceUseCase {
  constructor(companysRepository, servicesRepository) {
    this.companysRepository = companysRepository;
    this.servicesRepository = servicesRepository;
  }
  async execute({
    idCompanys,
    description,
    name,
    price
  }) {
    if (!(0, _ensureId.ensureId)(idCompanys)) {
      throw new _AppError.AppError("Company not found", 404);
    }
    const checkCompanyExists = await this.companysRepository.findById(idCompanys);
    if (!checkCompanyExists) {
      throw new _AppError.AppError("Company not found", 404);
    }
    if (!(0, _ensureName.ensureName)(name)) {
      throw new _AppError.AppError("Name is not available", 401);
    }
    const serviceAlreadyExist = await this.servicesRepository.findServiceByNameAndByCompanyId(idCompanys, name);
    if (serviceAlreadyExist) {
      throw new _AppError.AppError("Service already exist", 404);
    }
    if (!(0, _ensurePrice.ensurePrice)(price)) {
      throw new _AppError.AppError("Price is not available", 401);
    }
    if (!(0, _ensureDescription.ensureDecription)(description)) {
      throw new _AppError.AppError("Description is not available", 401);
    }
    const service = await this.servicesRepository.create({
      idCompanys,
      description,
      name,
      price
    });
    return service;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.CreateServiceUseCase = CreateServiceUseCase;