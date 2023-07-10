"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateServiceByIdController = void 0;
var _tsyringe = require("tsyringe");
var _UpdateServiceByIdUseCase = require("./UpdateServiceByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class UpdateServiceByIdController {
  async handle(request, response) {
    const {
      description,
      name,
      price
    } = request.body;
    const {
      idServices
    } = request.params;
    const updateServiceByIdUseCase = _tsyringe.container.resolve(_UpdateServiceByIdUseCase.UpdateServiceByIdUseCase);
    await updateServiceByIdUseCase.execute({
      id: idServices,
      description,
      name,
      price
    });
    return response.status(201).json({
      message: "Updated Service successfully."
    });
  }
}
exports.UpdateServiceByIdController = UpdateServiceByIdController;