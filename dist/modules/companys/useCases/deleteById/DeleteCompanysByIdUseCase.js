"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCompanyByIdUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _IUsersRepository = require("../../../accounts/repositories/IUsersRepository");
var _IClientsRepository = require("../../../clients/repositories/IClientsRepository");
var _ICompanysRepository = require("../../repositories/ICompanysRepository");
var _ICostsRepository = require("../../../costs/repositories/ICostsRepository");
var _IServicesRepository = require("../../../services/repositories/IServicesRepository");
var _IServiceExecutedRepository = require("../../../servicesExcuteds/repositories/IServiceExecutedRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class;
let DeleteCompanyByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceExecutedRepository")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("ServicesRepository")(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)("CostsRepository")(target, undefined, 4);
}, _dec7 = function (target, key) {
  return (0, _tsyringe.inject)("ClientsRepository")(target, undefined, 5);
}, _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository, typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IServiceExecutedRepository.IServiceExecutedRepository === "undefined" ? Object : _IServiceExecutedRepository.IServiceExecutedRepository, typeof _IServicesRepository.IServicesRepository === "undefined" ? Object : _IServicesRepository.IServicesRepository, typeof _ICostsRepository.ICostsRepository === "undefined" ? Object : _ICostsRepository.ICostsRepository, typeof _IClientsRepository.IClientsRepository === "undefined" ? Object : _IClientsRepository.IClientsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = class DeleteCompanyByIdUseCase {
  constructor(companysRepository, userRepository, serviceExecutedRepository, servicesRepository, costRepository, clientsRepository) {
    this.companysRepository = companysRepository;
    this.userRepository = userRepository;
    this.serviceExecutedRepository = serviceExecutedRepository;
    this.servicesRepository = servicesRepository;
    this.costRepository = costRepository;
    this.clientsRepository = clientsRepository;
  }
  async execute({
    id
  }) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("Company not found", 404);
    }
    const checkCompanyExist = await this.companysRepository.findById(id);
    if (!checkCompanyExist) {
      throw new _AppError.AppError("Company not found", 404);
    }
    const checkUserExist = await this.userRepository.listByCompanyId(checkCompanyExist.id);
    if (checkUserExist.length > 0) {
      throw new _AppError.AppError("Cannot delete company when there is a related user", 401);
    }
    const checkClientExist = await this.clientsRepository.listByCompanyId(checkCompanyExist.id);
    if (checkClientExist.length > 0) {
      throw new _AppError.AppError("Cannot delete company when there is a related client", 401);
    }
    const checkCostExists = await this.costRepository.listByIdCompany(checkCompanyExist.id);
    if (checkCostExists.length > 0) {
      throw new _AppError.AppError("Cannot delete company when there is a related cost", 401);
    }
    const checkServiceExists = await this.servicesRepository.listByCompanyId(checkCompanyExist.id);
    if (checkServiceExists.length > 0) {
      throw new _AppError.AppError("Cannot delete company when there is a related service", 401);
    }
    const checkExistServiceExcuted = await this.serviceExecutedRepository.listByCompanyId(checkCompanyExist.id);
    if (checkExistServiceExcuted.length > 0) {
      throw new _AppError.AppError("Cannot delete company when there is a related executed service", 401);
    }
    await this.companysRepository.deleteById(id);
    await this.userRepository.updateCompanysIdsByCompanyId(id);
  }
}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DeleteCompanyByIdUseCase = DeleteCompanyByIdUseCase;