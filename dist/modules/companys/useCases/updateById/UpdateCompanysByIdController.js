"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCompanyByIdController = void 0;
var _tsyringe = require("tsyringe");
var _UpdateCompanysByIdUseCase = require("./UpdateCompanysByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class UpdateCompanyByIdController {
  async handle(request, response) {
    const {
      address,
      name,
      phone
    } = request.body;
    const {
      idCompanys
    } = request.params;
    const updateCompanyByIdUseCase = _tsyringe.container.resolve(_UpdateCompanysByIdUseCase.UpdateCompanyByIdUseCase);
    await updateCompanyByIdUseCase.execute({
      id: idCompanys,
      address,
      name,
      phone
    });
    return response.status(200).json({
      message: "Updated Company successfully."
    });
  }
}
exports.UpdateCompanyByIdController = UpdateCompanyByIdController;