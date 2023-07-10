"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServicesByCompanyIdController = void 0;
var _tsyringe = require("tsyringe");
var _ListServicesByCompanyIdUseCase = require("./ListServicesByCompanyIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListServicesByCompanyIdController {
  async handle(request, response) {
    const {
      idCompanys
    } = request.params;
    const listServicesByCompanyIdUseCase = _tsyringe.container.resolve(_ListServicesByCompanyIdUseCase.ListServicesByCompanyIdUseCase);
    const services = await listServicesByCompanyIdUseCase.execute(idCompanys);
    return response.status(200).json(services);
  }
}
exports.ListServicesByCompanyIdController = ListServicesByCompanyIdController;