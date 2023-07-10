"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindCompanyByIdController = void 0;
var _tsyringe = require("tsyringe");
var _FindCompanyByIdUseCase = require("./FindCompanyByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class FindCompanyByIdController {
  async handle(request, response) {
    const {
      idCompanys
    } = request.params;
    const findCompanyByIdUseCase = _tsyringe.container.resolve(_FindCompanyByIdUseCase.FindCompanyByIdUseCase);
    const company = await findCompanyByIdUseCase.execute({
      id: idCompanys
    });
    return response.status(201).json(company);
  }
}
exports.FindCompanyByIdController = FindCompanyByIdController;