"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUsersController = void 0;
var _tsyringe = require("tsyringe");
var _UpdateUsersUseCase = require("./UpdateUsersUseCase");
class UpdateUsersController {
  async handle(request, response) {
    const {
      name,
      email,
      address,
      phone,
      idCompanys
    } = request.body;
    const {
      idUsers
    } = request.params;
    const updateUsersUseCase = _tsyringe.container.resolve(_UpdateUsersUseCase.UpdateUsersUseCase);
    await updateUsersUseCase.execute({
      id: idUsers,
      email,
      name,
      address,
      phone,
      idCompanys
    });
    return response.status(200).send({
      message: "User updated successfully"
    });
  }
}
exports.UpdateUsersController = UpdateUsersController;