"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateServiceExecutedByIdUseCase = void 0;
var _ensureDate = require("../../../../ensures/ensureDate");
var _ensureId = require("../../../../ensures/ensureId");
var _ensurePaymentMethod = require("../../../../ensures/ensurePaymentMethod");
var _IClientsRepository = require("../../../clients/repositories/IClientsRepository");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _IServicesRepository = require("../../../services/repositories/IServicesRepository");
var _IServiceExecutedRepository = require("../../repositories/IServiceExecutedRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
let UpdateServiceExecutedByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceExecutedRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ClientsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("ServicesRepository")(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IServiceExecutedRepository.IServiceExecutedRepository === "undefined" ? Object : _IServiceExecutedRepository.IServiceExecutedRepository, typeof _IClientsRepository.IClientsRepository === "undefined" ? Object : _IClientsRepository.IClientsRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository, typeof _IServicesRepository.IServicesRepository === "undefined" ? Object : _IServicesRepository.IServicesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class UpdateServiceExecutedByIdUseCase {
  constructor(serviceExecutedRepository, clientsRepository, companysRepository, servicesRepository) {
    this.serviceExecutedRepository = serviceExecutedRepository;
    this.clientsRepository = clientsRepository;
    this.companysRepository = companysRepository;
    this.servicesRepository = servicesRepository;
  }
  async execute({
    id,
    idClients,
    paymentDate,
    paymentMethod
  }) {
    if (!(0, _ensureId.ensureId)(idClients)) {
      throw new _AppError.AppError("Client not found", 404);
    }
    const checkCompanyExists = await this.clientsRepository.findById(idClients);
    if (!checkCompanyExists) {
      throw new _AppError.AppError("Client not found", 404);
    }
    const checkServiceExecutedExists = await this.serviceExecutedRepository.findById(id);
    if (!checkServiceExecutedExists) {
      throw new _AppError.AppError("Service Executed not found", 404);
    }
    if (!(0, _ensurePaymentMethod.ensurePaymentMethod)(paymentMethod)) {
      throw new _AppError.AppError("Payment method is not valid", 401);
    }
    if (!(0, _ensureDate.ensureDate)(paymentDate)) {
      throw new _AppError.AppError("Payment date not found", 404);
    }
    if (paymentMethod.toString() !== checkServiceExecutedExists.paymentMethod && checkServiceExecutedExists.paymentMethod === "Installments") {
      const calcDiscount = checkCompanyExists.debit - checkServiceExecutedExists.value;
      await this.clientsRepository.updatedById({
        id: idClients,
        debit: Math.abs(calcDiscount)
      });
    }
    await this.serviceExecutedRepository.updateById({
      id,
      idClients,
      paymentDate,
      paymentMethod
    });
  }
}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.UpdateServiceExecutedByIdUseCase = UpdateServiceExecutedByIdUseCase;