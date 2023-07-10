"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateServiceExecutedController = void 0;
var _tsyringe = require("tsyringe");
var _CreateServiceExecutedUseCase = require("./CreateServiceExecutedUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class CreateServiceExecutedController {
  async handle(request, response) {
    const {
      paymentMethod,
      paymentDate,
      serviceDate,
      idServices,
      idCompanys,
      idClients,
      idUsers
    } = request.body;
    const {
      id
    } = request.user;
    const createServiceExecutedUseCase = _tsyringe.container.resolve(_CreateServiceExecutedUseCase.CreateServiceExecutedUseCase);
    const serviceExecuted = await createServiceExecutedUseCase.execute({
      idClients,
      idServices,
      idCompanys,
      idUsers,
      paymentMethod,
      paymentDate,
      serviceDate,
      isLogged: id
    });
    return response.status(201).json(serviceExecuted);
  }
}
exports.CreateServiceExecutedController = CreateServiceExecutedController;