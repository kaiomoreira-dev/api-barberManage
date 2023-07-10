"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteServiceByIdUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _IServicesRepository = require("../../repositories/IServicesRepository");
var _IServiceExecutedRepository = require("../../../servicesExcuteds/repositories/IServiceExecutedRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let DeleteServiceByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ServicesRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceExecutedRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IServicesRepository.IServicesRepository === "undefined" ? Object : _IServicesRepository.IServicesRepository, typeof _IServiceExecutedRepository.IServiceExecutedRepository === "undefined" ? Object : _IServiceExecutedRepository.IServiceExecutedRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteServiceByIdUseCase {
  constructor(servicesRepository, serviceExecutedRepository) {
    this.servicesRepository = servicesRepository;
    this.serviceExecutedRepository = serviceExecutedRepository;
  }
  async execute({
    id
  }) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("Service not found", 404);
    }
    const checkServiceExists = await this.servicesRepository.findById(id);
    if (!checkServiceExists) {
      throw new _AppError.AppError("Service not found", 404);
    }
    const checkExistServiceExcuted = await this.serviceExecutedRepository.listByServiceId(checkServiceExists.id);
    if (checkExistServiceExcuted.length > 0) {
      throw new _AppError.AppError("Cannot delete service when there is a related executed service", 404);
    }
    await this.servicesRepository.deleteById(id);
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.DeleteServiceByIdUseCase = DeleteServiceByIdUseCase;