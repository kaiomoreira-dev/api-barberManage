"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindCostByIdController = void 0;
var _tsyringe = require("tsyringe");
var _FindByIdUseCase = require("./FindByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class FindCostByIdController {
  async handle(request, response) {
    const {
      idCost
    } = request.params;
    const findCostByIdUseCase = _tsyringe.container.resolve(_FindByIdUseCase.FindCostByIdUseCase);
    const company = await findCostByIdUseCase.execute({
      id: idCost
    });
    return response.status(201).json(company);
  }
}
exports.FindCostByIdController = FindCostByIdController;