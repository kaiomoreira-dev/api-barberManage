"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteServiceExecutedByIdController = void 0;
var _tsyringe = require("tsyringe");
var _DeleteServiceExecutedByIdUseCase = require("./DeleteServiceExecutedByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class DeleteServiceExecutedByIdController {
  async handle(request, response) {
    const {
      idServiceExecuted: id
    } = request.params;
    const deleteServiceExecutedByIdUseCase = _tsyringe.container.resolve(_DeleteServiceExecutedByIdUseCase.DeleteServiceExecutedByIdUseCase);
    await deleteServiceExecutedByIdUseCase.execute(id);
    return response.status(201).json({
      message: "Deleted  ServiceExecuted successfully."
    });
  }
}
exports.DeleteServiceExecutedByIdController = DeleteServiceExecutedByIdController;