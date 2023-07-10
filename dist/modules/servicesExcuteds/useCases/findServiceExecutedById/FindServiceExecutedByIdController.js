"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindServiceExecutedByIdController = void 0;
var _tsyringe = require("tsyringe");
var _FindServiceExecutedByIdUseCase = require("./FindServiceExecutedByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class FindServiceExecutedByIdController {
  async handle(request, response) {
    const {
      idServiceExecuted
    } = request.params;
    const findServiceExecutedByIdUseCase = _tsyringe.container.resolve(_FindServiceExecutedByIdUseCase.FindServiceExecutedByIdUseCase);
    const serviceExecuted = await findServiceExecutedByIdUseCase.execute({
      id: idServiceExecuted
    });
    return response.status(201).json(serviceExecuted);
  }
}
exports.FindServiceExecutedByIdController = FindServiceExecutedByIdController;