"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindClientByIdUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _IClientsRepository = require("../../repositories/IClientsRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let FindClientByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ClientsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IClientsRepository.IClientsRepository === "undefined" ? Object : _IClientsRepository.IClientsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindClientByIdUseCase {
  constructor(clientsRepository) {
    this.clientsRepository = clientsRepository;
  }
  async execute({
    id
  }) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("Client not found", 404);
    }
    const checkClientExist = await this.clientsRepository.findById(id);
    if (!checkClientExist) {
      throw new _AppError.AppError("Client not found", 404);
    }
    return checkClientExist;
  }
}) || _class) || _class) || _class) || _class);
exports.FindClientByIdUseCase = FindClientByIdUseCase;