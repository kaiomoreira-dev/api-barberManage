"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCompanysController = void 0;
var _tsyringe = require("tsyringe");
var _CreateCompanysUseCase = require("./CreateCompanysUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class CreateCompanysController {
  async handle(request, response) {
    const {
      address,
      name,
      phone
    } = request.body;
    const {
      idUsers
    } = request.params;
    const createCompanysUseCase = _tsyringe.container.resolve(_CreateCompanysUseCase.CreateCompanysUseCase);
    const company = await createCompanysUseCase.execute({
      idUsers,
      address,
      name,
      phone
    });
    return response.status(201).json(company);
  }
}
exports.CreateCompanysController = CreateCompanysController;