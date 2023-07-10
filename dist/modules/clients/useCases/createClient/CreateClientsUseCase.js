"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateClientsUseCase = void 0;
var _ensureAddress = require("../../../../ensures/ensureAddress");
var _ensureEsqd = require("../../../../ensures/ensureEsqd");
var _ensureId = require("../../../../ensures/ensureId");
var _ensureName = require("../../../../ensures/ensureName");
var _ensureNumber = require("../../../../ensures/ensureNumber");
var _ensurePG = require("../../../../ensures/ensurePG");
var _ensurePhone = require("../../../../ensures/ensurePhone");
var _IClientsRepository = require("../../repositories/IClientsRepository");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
/* eslint-disable import/no-unresolved */
let CreateClientsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ClientsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IClientsRepository.IClientsRepository === "undefined" ? Object : _IClientsRepository.IClientsRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateClientsUseCase {
  constructor(clientsRepository, companysRepository) {
    this.clientsRepository = clientsRepository;
    this.companysRepository = companysRepository;
  }
  async execute({
    idCompanys,
    name,
    address,
    esqd,
    num,
    pg,
    phone,
    military
  }) {
    if (!(0, _ensureId.ensureId)(idCompanys)) {
      throw new _AppError.AppError("Client not found", 404);
    }
    const checkCompanyExist = await this.companysRepository.findById(idCompanys);
    if (!checkCompanyExist) {
      throw new _AppError.AppError("Company not found", 404);
    }
    if (!(0, _ensureName.ensureName)(name)) {
      throw new _AppError.AppError("Name is not available", 401);
    }
    const checkCompanyExists = await this.clientsRepository.findByNameAndIdCompanys(name, idCompanys);
    if (checkCompanyExists) {
      throw new _AppError.AppError("Client already exists", 401);
    }
    if (!(0, _ensureAddress.ensureAddress)(address)) {
      throw new _AppError.AppError("Adress is not available", 401);
    }

    // add test for phone in jest
    if (!(0, _ensurePhone.ensurePhone)(phone)) {
      throw new _AppError.AppError("Phone is not available", 401);
    }
    if (!(0, _ensureNumber.ensureNumber)(num)) {
      throw new _AppError.AppError("Number is not available", 401);
    }
    if (!(0, _ensureEsqd.ensureEsqd)(esqd)) {
      throw new _AppError.AppError("Esqd is not available", 401);
    }
    if (!(0, _ensurePG.ensurePG)(pg)) {
      throw new _AppError.AppError("Pg is not available", 401);
    }
    const client = await this.clientsRepository.create({
      idCompanys,
      name,
      address,
      esqd,
      num,
      pg,
      phone,
      military
    });
    return client;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.CreateClientsUseCase = CreateClientsUseCase;