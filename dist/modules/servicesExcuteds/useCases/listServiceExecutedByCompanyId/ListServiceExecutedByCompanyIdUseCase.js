"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServiceExecutedByCompanyIdUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _UserMap = require("../../../accounts/mappers/UserMap");
var _IUsersRepository = require("../../../accounts/repositories/IUsersRepository");
var _IClientsRepository = require("../../../clients/repositories/IClientsRepository");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _IServicesRepository = require("../../../services/repositories/IServicesRepository");
var _IServiceExecutedRepository = require("../../repositories/IServiceExecutedRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
let ListServiceExecutedByCompanyIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceExecutedRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ClientsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)("ServicesRepository")(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _IServiceExecutedRepository.IServiceExecutedRepository === "undefined" ? Object : _IServiceExecutedRepository.IServiceExecutedRepository, typeof _IClientsRepository.IClientsRepository === "undefined" ? Object : _IClientsRepository.IClientsRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository, typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IServicesRepository.IServicesRepository === "undefined" ? Object : _IServicesRepository.IServicesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class ListServiceExecutedByCompanyIdUseCase {
  constructor(serviceExecutedRepository, clientsRepository, companysRepository, usersRepository, servicesRepository) {
    this.serviceExecutedRepository = serviceExecutedRepository;
    this.clientsRepository = clientsRepository;
    this.companysRepository = companysRepository;
    this.usersRepository = usersRepository;
    this.servicesRepository = servicesRepository;
  }
  async execute(pageNumber, idCompanys) {
    if (!(0, _ensureId.ensureId)(idCompanys)) {
      throw new _AppError.AppError("ServiceExecuted not found", 404);
    }
    const checkCompanyExist = await this.companysRepository.findById(idCompanys);
    if (!checkCompanyExist) {
      throw new _AppError.AppError("Company not found", 404);
    }
    const servicesExecuted = await this.serviceExecutedRepository.listByCompanyId(pageNumber, idCompanys);
    console.log(JSON.stringify(servicesExecuted, null, 2));
    const allServicesExecutedByClient = [];
    let allServicesRequired = [];
    for (const service of servicesExecuted) {
      allServicesRequired = [];
      for (const serviceIdRequired of service.idServices) {
        const findService = await this.servicesRepository.findById(String(serviceIdRequired));
        allServicesRequired.push(findService);
      }
      const client = await this.clientsRepository.findById(String(service.idClients));
      const users = await this.usersRepository.findById(String(service.idUsers));
      const idCompanys = [];
      for (const company of users.idCompanys) {
        idCompanys.push(String(company));
      }
      const serviceExecuted = {
        id: service._id,
        company: checkCompanyExist,
        user: _UserMap.UserMap.toDTO({
          id: users.id,
          name: users.name,
          email: users.email,
          phone: users.phone,
          address: users.address,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
          admin: users.admin,
          employee: users.employee,
          idCompanys
        }),
        client,
        services: allServicesRequired,
        isLogged: service.isLogged,
        value: service.value,
        paymentMethod: service.paymentMethod,
        paymentDate: service.paymentDate,
        serviceDate: service.serviceDate
      };
      allServicesExecutedByClient.push(serviceExecuted);
    }
    return allServicesExecutedByClient;
  }
}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ListServiceExecutedByCompanyIdUseCase = ListServiceExecutedByCompanyIdUseCase;