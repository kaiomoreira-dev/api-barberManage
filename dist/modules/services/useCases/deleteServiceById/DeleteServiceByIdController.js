"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteServiceByIdController = void 0;
var _tsyringe = require("tsyringe");
var _DeleteServiceByIdUseCase = require("./DeleteServiceByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class DeleteServiceByIdController {
  async handle(request, response) {
    const {
      idServices
    } = request.params;
    const deleteServiceByIdUseCase = _tsyringe.container.resolve(_DeleteServiceByIdUseCase.DeleteServiceByIdUseCase);
    await deleteServiceByIdUseCase.execute({
      id: idServices
    });
    return response.status(201).json({
      message: "Deleted Service successfully."
    });
  }
}
exports.DeleteServiceByIdController = DeleteServiceByIdController;