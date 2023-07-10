"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServicesUseCase = void 0;
var _IServicesRepository = require("../../repositories/IServicesRepository");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
let ListServicesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ServicesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IServicesRepository.IServicesRepository === "undefined" ? Object : _IServicesRepository.IServicesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListServicesUseCase {
  constructor(servicesRepository) {
    this.servicesRepository = servicesRepository;
  }
  async execute() {
    const companys = await this.servicesRepository.list();
    return companys;
  }
}) || _class) || _class) || _class) || _class);
exports.ListServicesUseCase = ListServicesUseCase;