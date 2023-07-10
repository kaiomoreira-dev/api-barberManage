"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServiceExecutedByCompanyIdController = void 0;
var _tsyringe = require("tsyringe");
var _ListServiceExecutedByCompanyIdUseCase = require("./ListServiceExecutedByCompanyIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListServiceExecutedByCompanyIdController {
  async handle(request, response) {
    const {
      pageNumber,
      idCompanys
    } = request.params;
    const listServiceExecutedByCompanyIdUseCase = _tsyringe.container.resolve(_ListServiceExecutedByCompanyIdUseCase.ListServiceExecutedByCompanyIdUseCase);
    const serviceExecuted = await listServiceExecutedByCompanyIdUseCase.execute(Number(pageNumber), idCompanys);
    return response.status(200).json(serviceExecuted);
  }
}
exports.ListServiceExecutedByCompanyIdController = ListServiceExecutedByCompanyIdController;