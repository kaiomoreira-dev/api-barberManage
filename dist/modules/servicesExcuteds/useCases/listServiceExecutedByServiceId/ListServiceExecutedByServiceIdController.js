"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServiceExecutedByServiceIdController = void 0;
var _tsyringe = require("tsyringe");
var _ListServiceExecutedByServiceIdUseCase = require("./ListServiceExecutedByServiceIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListServiceExecutedByServiceIdController {
  async handle(request, response) {
    const {
      idServices
    } = request.params;
    const listServiceExecutedByServiceIdUseCase = _tsyringe.container.resolve(_ListServiceExecutedByServiceIdUseCase.ListServiceExecutedByServiceIdUseCase);
    const serviceExecuted = await listServiceExecutedByServiceIdUseCase.execute(idServices);
    return response.status(200).json(serviceExecuted);
  }
}
exports.ListServiceExecutedByServiceIdController = ListServiceExecutedByServiceIdController;