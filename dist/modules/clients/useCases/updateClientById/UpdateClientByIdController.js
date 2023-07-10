"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateClientByIdController = void 0;
var _tsyringe = require("tsyringe");
var _UpdateClientByIdUseCase = require("./UpdateClientByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class UpdateClientByIdController {
  async handle(request, response) {
    const {
      idCompanys,
      name,
      address,
      esqd,
      num,
      pg,
      phone,
      military
    } = request.body;
    const {
      idClients
    } = request.params;
    const updateClientByIdUseCase = _tsyringe.container.resolve(_UpdateClientByIdUseCase.UpdateClientByIdUseCase);
    await updateClientByIdUseCase.execute({
      id: idClients,
      idCompanys,
      name,
      address,
      esqd,
      num,
      pg,
      phone,
      military
    });
    return response.status(200).json({
      message: "Updated Client successfully."
    });
  }
}
exports.UpdateClientByIdController = UpdateClientByIdController;