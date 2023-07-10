"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListClientsUseCase = void 0;
var _IClientsRepository = require("../../repositories/IClientsRepository");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
let ListClientsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ClientsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IClientsRepository.IClientsRepository === "undefined" ? Object : _IClientsRepository.IClientsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListClientsUseCase {
  constructor(clirntsRepository) {
    this.clirntsRepository = clirntsRepository;
  }
  async execute() {
    const clients = await this.clirntsRepository.list();
    return clients;
  }
}) || _class) || _class) || _class) || _class);
exports.ListClientsUseCase = ListClientsUseCase;