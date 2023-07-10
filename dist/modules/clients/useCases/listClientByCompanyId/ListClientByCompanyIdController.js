"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListClientByCompanyIdController = void 0;
var _tsyringe = require("tsyringe");
var _ListClientByCompanyIdUseCase = require("./ListClientByCompanyIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListClientByCompanyIdController {
  async handle(request, response) {
    const {
      idCompanys
    } = request.params;
    const listClientByCompanyIdUseCase = _tsyringe.container.resolve(_ListClientByCompanyIdUseCase.ListClientByCompanyIdUseCase);
    const companys = await listClientByCompanyIdUseCase.execute(idCompanys);
    return response.status(200).json(companys);
  }
}
exports.ListClientByCompanyIdController = ListClientByCompanyIdController;