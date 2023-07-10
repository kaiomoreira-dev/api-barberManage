"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServiceExecutedByUserIdController = void 0;
var _tsyringe = require("tsyringe");
var _ListServiceExecutedByUserIdUseCase = require("./ListServiceExecutedByUserIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListServiceExecutedByUserIdController {
  async handle(request, response) {
    const {
      idUsers
    } = request.params;
    const listServiceExecutedByUserIdUseCase = _tsyringe.container.resolve(_ListServiceExecutedByUserIdUseCase.ListServiceExecutedByUserIdUseCase);
    const serviceExecuted = await listServiceExecutedByUserIdUseCase.execute(idUsers);
    return response.status(200).json(serviceExecuted);
  }
}
exports.ListServiceExecutedByUserIdController = ListServiceExecutedByUserIdController;