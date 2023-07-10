"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindServiceByIdUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _IServicesRepository = require("../../repositories/IServicesRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let FindServiceByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ServicesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IServicesRepository.IServicesRepository === "undefined" ? Object : _IServicesRepository.IServicesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindServiceByIdUseCase {
  constructor(servicesRepository) {
    this.servicesRepository = servicesRepository;
  }
  async execute({
    id
  }) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("Service not found", 404);
    }
    const checkServiceExists = this.servicesRepository.findById(id);
    if (!checkServiceExists) {
      throw new _AppError.AppError("Service not found", 404);
    }
    return checkServiceExists;
  }
}) || _class) || _class) || _class) || _class);
exports.FindServiceByIdUseCase = FindServiceByIdUseCase;