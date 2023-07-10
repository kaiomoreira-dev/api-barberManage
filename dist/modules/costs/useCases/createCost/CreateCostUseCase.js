"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCostUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _ensureName = require("../../../../ensures/ensureName");
var _ensurePrice = require("../../../../ensures/ensurePrice");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _ICostsRepository = require("../../repositories/ICostsRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let CreateCostUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CostsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICostsRepository.ICostsRepository === "undefined" ? Object : _ICostsRepository.ICostsRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCostUseCase {
  constructor(costRepository, companysRepository) {
    this.costRepository = costRepository;
    this.companysRepository = companysRepository;
  }
  async execute({
    description,
    idCompanys,
    value,
    costDate
  }) {
    if (!(0, _ensureName.ensureName)(description)) {
      throw new _AppError.AppError("Description is not available", 401);
    }
    if (!(0, _ensureId.ensureId)(idCompanys)) {
      throw new _AppError.AppError("Company not found", 404);
    }
    const checkCompanyExists = await this.companysRepository.findById(idCompanys);
    if (!checkCompanyExists) {
      throw new _AppError.AppError("Company not found", 401);
    }
    if (!(0, _ensurePrice.ensurePrice)(value)) {
      throw new _AppError.AppError("Value not valid", 401);
    }
    const company = await this.costRepository.create({
      description,
      idCompanys,
      value,
      costDate
    });
    return company;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.CreateCostUseCase = CreateCostUseCase;