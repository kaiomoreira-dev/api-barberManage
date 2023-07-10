"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCostController = void 0;
var _tsyringe = require("tsyringe");
var _CreateCostUseCase = require("./CreateCostUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class CreateCostController {
  async handle(request, response) {
    const {
      description,
      value,
      costDate
    } = request.body;
    const {
      idCompanys
    } = request.params;
    const createCompanyUseCase = _tsyringe.container.resolve(_CreateCostUseCase.CreateCostUseCase);
    const cost = await createCompanyUseCase.execute({
      description,
      value,
      costDate,
      idCompanys
    });
    return response.status(201).json(cost);
  }
}
exports.CreateCostController = CreateCostController;