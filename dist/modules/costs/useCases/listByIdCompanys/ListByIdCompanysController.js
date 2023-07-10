"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListByIdCompanysController = void 0;
var _tsyringe = require("tsyringe");
var _ListByIdCompnaysUseCase = require("./ListByIdCompnaysUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListByIdCompanysController {
  async handle(request, response) {
    const {
      idCompanys
    } = request.params;
    const listByIdCopmanysUseCase = _tsyringe.container.resolve(_ListByIdCompnaysUseCase.ListByIdCompanysUseCase);
    const costs = await listByIdCopmanysUseCase.execute({
      id: idCompanys
    });
    return response.status(200).json(costs);
  }
}
exports.ListByIdCompanysController = ListByIdCompanysController;