"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteServiceExecutedByIdUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _IClientsRepository = require("../../../clients/repositories/IClientsRepository");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _IServiceExecutedRepository = require("../../repositories/IServiceExecutedRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
let DeleteServiceExecutedByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceExecutedRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ClientsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IServiceExecutedRepository.IServiceExecutedRepository === "undefined" ? Object : _IServiceExecutedRepository.IServiceExecutedRepository, typeof _IClientsRepository.IClientsRepository === "undefined" ? Object : _IClientsRepository.IClientsRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DeleteServiceExecutedByIdUseCase {
  constructor(serviceExecutedRepository, clientsRepository, companysRepository) {
    this.serviceExecutedRepository = serviceExecutedRepository;
    this.clientsRepository = clientsRepository;
    this.companysRepository = companysRepository;
  }
  async execute(id) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("ServiceExecuted not found", 404);
    }
    const checkServiceExecutedExists = await this.serviceExecutedRepository.findById(id);
    if (!checkServiceExecutedExists) {
      throw new _AppError.AppError("Service Executed not found", 404);
    }
    const checkClientExists = await this.clientsRepository.findById(String(checkServiceExecutedExists.idClients));
    const paymentMethodEnumNum = checkServiceExecutedExists.paymentMethod === "Installments" ? checkServiceExecutedExists.paymentMethod : null;
    if (paymentMethodEnumNum === "Installments") {
      const calcDiscount = checkClientExists.debit - checkServiceExecutedExists.value;
      await this.clientsRepository.updatedById({
        id: checkClientExists.id,
        debit: calcDiscount
      });
    }
    await this.serviceExecutedRepository.deleteById(id);
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DeleteServiceExecutedByIdUseCase = DeleteServiceExecutedByIdUseCase;