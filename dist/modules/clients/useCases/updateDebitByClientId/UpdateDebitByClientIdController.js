"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateDebitByClientIdController = void 0;
var _tsyringe = require("tsyringe");
var _UpdateDebitByClientIdUseCase = require("./UpdateDebitByClientIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class UpdateDebitByClientIdController {
  async handle(request, response) {
    const {
      debit
    } = request.body;
    const {
      idClients
    } = request.params;
    const updateDebitByClientIdUseCase = _tsyringe.container.resolve(_UpdateDebitByClientIdUseCase.UpdateDebitByClientIdUseCase);
    await updateDebitByClientIdUseCase.execute({
      id: idClients,
      debit
    });
    return response.status(200).json({
      message: "Updated Client successfully."
    });
  }
}
exports.UpdateDebitByClientIdController = UpdateDebitByClientIdController;