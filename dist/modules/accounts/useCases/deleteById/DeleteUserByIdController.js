"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUserByIdController = void 0;
var _tsyringe = require("tsyringe");
var _DeleteUserByIdUseCase = require("./DeleteUserByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class DeleteUserByIdController {
  async handle(request, response) {
    const {
      idUsers: id
    } = request.params;
    const deleteUserByIdUseCase = _tsyringe.container.resolve(_DeleteUserByIdUseCase.DeleteUserByIdUseCase);
    await deleteUserByIdUseCase.execute(id);
    return response.status(201).json({
      message: "Deleted User successfully."
    });
  }
}
exports.DeleteUserByIdController = DeleteUserByIdController;