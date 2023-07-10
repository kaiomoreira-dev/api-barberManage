"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateServiceController = void 0;
var _tsyringe = require("tsyringe");
var _CreateServiceUseCase = require("./CreateServiceUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class CreateServiceController {
  async handle(request, response) {
    const {
      description,
      name,
      price
    } = request.body;
    const {
      idCompanys
    } = request.params;
    const createServiceUseCase = _tsyringe.container.resolve(_CreateServiceUseCase.CreateServiceUseCase);
    const service = await createServiceUseCase.execute({
      idCompanys,
      description,
      name,
      price
    });
    return response.status(201).json(service);
  }
}
exports.CreateServiceController = CreateServiceController;