"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCompanyController = void 0;
var _tsyringe = require("tsyringe");
var _CreateCompanyUseCase = require("./CreateCompanyUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class CreateCompanyController {
  async handle(request, response) {
    const {
      address,
      name,
      phone
    } = request.body;
    const {
      id
    } = request.user;
    const createCompanyUseCase = _tsyringe.container.resolve(_CreateCompanyUseCase.CreateCompanyUseCase);
    const company = await createCompanyUseCase.execute({
      idUsers: id,
      address,
      name,
      phone
    });
    return response.status(201).json(company);
  }
}
exports.CreateCompanyController = CreateCompanyController;