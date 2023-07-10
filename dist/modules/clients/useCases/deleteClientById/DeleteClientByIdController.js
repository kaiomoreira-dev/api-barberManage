"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteClientByIdController = void 0;
var _tsyringe = require("tsyringe");
var _DeleteClientByIdUseCase = require("./DeleteClientByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class DeleteClientByIdController {
  async handle(request, response) {
    const {
      idClients
    } = request.params;
    const deleteClientByIdUseCase = _tsyringe.container.resolve(_DeleteClientByIdUseCase.DeleteClientByIdUseCase);
    await deleteClientByIdUseCase.execute({
      id: idClients
    });
    return response.status(200).json({
      message: "Deleted Client successfully."
    });
  }
}
exports.DeleteClientByIdController = DeleteClientByIdController;