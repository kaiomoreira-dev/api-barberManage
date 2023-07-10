"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateServiceExecutedUseCase = void 0;
var _ensureDate = require("../../../../ensures/ensureDate");
var _ensureId = require("../../../../ensures/ensureId");
var _ensurePaymentMethod = require("../../../../ensures/ensurePaymentMethod");
var _IUsersRepository = require("../../../accounts/repositories/IUsersRepository");
var _IClientsRepository = require("../../../clients/repositories/IClientsRepository");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _IServicesRepository = require("../../../services/repositories/IServicesRepository");
var _ICreateServiceExecutedDTO = require("../../dtos/ICreateServiceExecutedDTO");
var _IServiceExecutedRepository = require("../../repositories/IServiceExecutedRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;
/* eslint-disable prettier/prettier */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
let CreateServiceExecutedUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ClientsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("ServicesRepository")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceExecutedRepository")(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _IClientsRepository.IClientsRepository === "undefined" ? Object : _IClientsRepository.IClientsRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository, typeof _IServicesRepository.IServicesRepository === "undefined" ? Object : _IServicesRepository.IServicesRepository, typeof _IServiceExecutedRepository.IServiceExecutedRepository === "undefined" ? Object : _IServiceExecutedRepository.IServiceExecutedRepository, typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class CreateServiceExecutedUseCase {
  constructor(clientsRepository, companysRepository, servicesRepository, serviceExecutedRepository, userRepository) {
    this.clientsRepository = clientsRepository;
    this.companysRepository = companysRepository;
    this.servicesRepository = servicesRepository;
    this.serviceExecutedRepository = serviceExecutedRepository;
    this.userRepository = userRepository;
  }
  async execute({
    idClients,
    idServices,
    idCompanys,
    idUsers,
    isLogged,
    paymentMethod,
    paymentDate,
    serviceDate
  }) {
    let priceService = 0;
    if (!(0, _ensureId.ensureId)(idClients)) {
      throw new _AppError.AppError("Client not found", 404);
    }
    const checkClientExists = await this.clientsRepository.findById(idClients);
    if (!checkClientExists) {
      throw new _AppError.AppError("Client not found", 404);
    }
    if (!(0, _ensureId.ensureId)(idCompanys)) {
      throw new _AppError.AppError("Company not found", 404);
    }
    const checkCompanyExists = await this.companysRepository.findById(idCompanys);
    if (!checkCompanyExists) {
      throw new _AppError.AppError("Company not found", 404);
    }
    if (!(0, _ensureId.ensureId)(idUsers)) {
      throw new _AppError.AppError("User not found", 404);
    }
    const checkUserExists = await this.userRepository.findById(idUsers);
    if (!checkUserExists) {
      throw new _AppError.AppError("User not found", 404);
    }
    if (!idServices) {
      throw new _AppError.AppError("Service not found", 404);
    }
    for (const serviceID of idServices) {
      const checkServiceExists = await this.servicesRepository.findById(serviceID);
      if (!checkServiceExists) {
        throw new _AppError.AppError("Service not found", 404);
      }
      priceService += checkServiceExists.price;
    }
    if (!(0, _ensurePaymentMethod.ensurePaymentMethod)(paymentMethod)) {
      throw new _AppError.AppError("Payment method is not valid", 401);
    }
    if (!(0, _ensureDate.ensureDate)(paymentDate)) {
      throw new _AppError.AppError("Payment date not found", 404);
    }
    if (!(0, _ensureDate.ensureDate)(serviceDate)) {
      throw new _AppError.AppError("Service date not found", 404);
    }
    const paymentMethodEnumNum = paymentMethod.toString() === "Installments" ? 3 : paymentMethod;
    if (paymentMethodEnumNum === _ICreateServiceExecutedDTO.PaymentMethod.Installments) {
      const total = priceService + checkClientExists.debit;
      await this.clientsRepository.updatedById({
        id: idClients,
        debit: total
      });
    }
    const serviceExecuted = await this.serviceExecutedRepository.create({
      idClients,
      idServices,
      idCompanys,
      idUsers,
      isLogged,
      value: priceService,
      paymentMethod,
      paymentDate,
      serviceDate
    });
    return serviceExecuted;
  }
}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateServiceExecutedUseCase = CreateServiceExecutedUseCase;