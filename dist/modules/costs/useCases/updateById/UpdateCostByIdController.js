"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCostByIdController = void 0;
var _tsyringe = require("tsyringe");
var _UpdateCostByIdUseCase = require("./UpdateCostByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class UpdateCostByIdController {
  async handle(request, response) {
    const {
      description,
      idCompanys,
      costDate,
      value
    } = request.body;
    const {
      idCost
    } = request.params;
    const updateCostByIdUseCase = _tsyringe.container.resolve(_UpdateCostByIdUseCase.UpdateCostByIdUseCase);
    await updateCostByIdUseCase.execute({
      id: idCost,
      description,
      idCompanys,
      costDate,
      value
    });
    return response.status(200).json({
      message: "Updated Cost successfully."
    });
  }
}
exports.UpdateCostByIdController = UpdateCostByIdController;