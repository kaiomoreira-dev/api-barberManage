"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateServiceByIdUseCase = void 0;
var _ensureDescription = require("../../../../ensures/ensureDescription");
var _ensureName = require("../../../../ensures/ensureName");
var _ensurePrice = require("../../../../ensures/ensurePrice");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _IServicesRepository = require("../../repositories/IServicesRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
/* eslint-disable import/no-unresolved */
let UpdateServiceByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ServicesRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IServicesRepository.IServicesRepository === "undefined" ? Object : _IServicesRepository.IServicesRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateServiceByIdUseCase {
  constructor(servicesRepository, companysRepository) {
    this.servicesRepository = servicesRepository;
    this.companysRepository = companysRepository;
  }
  async execute({
    id,
    description,
    name,
    price
  }) {
    if (!(0, _ensureName.ensureName)(name)) {
      throw new _AppError.AppError("Name is not available", 401);
    }
    const serviceAlreadyExist = await this.servicesRepository.findById(id);
    if (!serviceAlreadyExist) {
      throw new _AppError.AppError("Service not found", 404);
    }
    if (!(0, _ensurePrice.ensurePrice)(price)) {
      throw new _AppError.AppError("Price is not available", 401);
    }
    if (!(0, _ensureDescription.ensureDecription)(description)) {
      throw new _AppError.AppError("Description is not available", 401);
    }
    await this.servicesRepository.updateById({
      id,
      description,
      name,
      price
    });
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateServiceByIdUseCase = UpdateServiceByIdUseCase;