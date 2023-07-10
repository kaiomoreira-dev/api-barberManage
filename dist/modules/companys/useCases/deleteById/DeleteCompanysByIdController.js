"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCompanyByIdController = void 0;
var _tsyringe = require("tsyringe");
var _DeleteCompanysByIdUseCase = require("./DeleteCompanysByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class DeleteCompanyByIdController {
  async handle(request, response) {
    const {
      idCompanys
    } = request.params;
    const deleteCompanyByIdUseCase = _tsyringe.container.resolve(_DeleteCompanysByIdUseCase.DeleteCompanyByIdUseCase);
    await deleteCompanyByIdUseCase.execute({
      id: idCompanys
    });
    return response.status(200).json({
      message: "Deleted Company successfully."
    });
  }
}
exports.DeleteCompanyByIdController = DeleteCompanyByIdController;