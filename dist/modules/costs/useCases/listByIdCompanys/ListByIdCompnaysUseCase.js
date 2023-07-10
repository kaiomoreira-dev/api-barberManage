"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListByIdCompanysUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _ICostsRepository = require("../../repositories/ICostsRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let ListByIdCompanysUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CostsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICostsRepository.ICostsRepository === "undefined" ? Object : _ICostsRepository.ICostsRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListByIdCompanysUseCase {
  constructor(costsRepository, companysRepository) {
    this.costsRepository = costsRepository;
    this.companysRepository = companysRepository;
  }
  async execute({
    id
  }) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("Service not found", 404);
    }
    const checkCompanyExist = await this.companysRepository.findById(id);
    if (!checkCompanyExist) {
      throw new _AppError.AppError("Company not found", 404);
    }
    const costs = await this.costsRepository.listByIdCompany(id);
    return costs;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.ListByIdCompanysUseCase = ListByIdCompanysUseCase;