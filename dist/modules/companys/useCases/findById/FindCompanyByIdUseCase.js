"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindCompanyByIdUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _ICompanysRepository = require("../../repositories/ICompanysRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let FindCompanyByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindCompanyByIdUseCase {
  constructor(companysRepository) {
    this.companysRepository = companysRepository;
  }
  async execute({
    id
  }) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("Company not found", 404);
    }
    const checkCompanyExists = this.companysRepository.findById(id);
    if (!checkCompanyExists) {
      throw new _AppError.AppError("Company not found", 404);
    }
    return checkCompanyExists;
  }
}) || _class) || _class) || _class) || _class);
exports.FindCompanyByIdUseCase = FindCompanyByIdUseCase;