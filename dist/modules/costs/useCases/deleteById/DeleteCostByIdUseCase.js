"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCostByIdUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _ICostsRepository = require("../../repositories/ICostsRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let DeleteCostByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CostsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICostsRepository.ICostsRepository === "undefined" ? Object : _ICostsRepository.ICostsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteCostByIdUseCase {
  constructor(costRepository) {
    this.costRepository = costRepository;
  }
  async execute({
    id
  }) {
    if (!(0, _ensureId.ensureId)(id)) {
      throw new _AppError.AppError("Service not found", 404);
    }
    const checkCostExists = await this.costRepository.findById(id);
    if (!checkCostExists) {
      throw new _AppError.AppError("Cost not found", 404);
    }
    await this.costRepository.deleteById(id);
  }
}) || _class) || _class) || _class) || _class);
exports.DeleteCostByIdUseCase = DeleteCostByIdUseCase;