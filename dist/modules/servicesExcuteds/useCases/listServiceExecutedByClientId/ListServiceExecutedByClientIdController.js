"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServiceExecutedByClientIdController = void 0;
var _tsyringe = require("tsyringe");
var _ListServiceExecutedByClientIdUseCase = require("./ListServiceExecutedByClientIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListServiceExecutedByClientIdController {
  async handle(request, response) {
    const {
      idClients
    } = request.params;
    const listServiceExecutedByClientIdUseCase = _tsyringe.container.resolve(_ListServiceExecutedByClientIdUseCase.ListServiceExecutedByClientIdUseCase);
    const serviceExecuted = await listServiceExecutedByClientIdUseCase.execute(idClients);
    return response.status(200).json(serviceExecuted);
  }
}
exports.ListServiceExecutedByClientIdController = ListServiceExecutedByClientIdController;