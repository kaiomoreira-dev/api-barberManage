"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateServiceExecutedByIdController = void 0;
var _tsyringe = require("tsyringe");
var _UpdateServiceExecutedByIdUseCase = require("./UpdateServiceExecutedByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class UpdateServiceExecutedByIdController {
  async handle(request, response) {
    const {
      paymentMethod,
      paymentDate,
      idClients
    } = request.body;
    const {
      idServiceExecuted
    } = request.params;
    const updateServiceExecutedByIdUseCase = _tsyringe.container.resolve(_UpdateServiceExecutedByIdUseCase.UpdateServiceExecutedByIdUseCase);
    await updateServiceExecutedByIdUseCase.execute({
      id: idServiceExecuted,
      idClients,
      paymentMethod,
      paymentDate
    });
    return response.status(201).json({
      message: "Updated  ServiceExecuted successfully."
    });
  }
}
exports.UpdateServiceExecutedByIdController = UpdateServiceExecutedByIdController;