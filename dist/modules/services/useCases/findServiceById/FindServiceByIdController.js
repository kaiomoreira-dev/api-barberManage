"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindServiceByIdController = void 0;
var _tsyringe = require("tsyringe");
var _FindServiceByIdUseCase = require("./FindServiceByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class FindServiceByIdController {
  async handle(request, response) {
    const {
      idServices
    } = request.params;
    const findServiceByIdUseCase = _tsyringe.container.resolve(_FindServiceByIdUseCase.FindServiceByIdUseCase);
    const service = await findServiceByIdUseCase.execute({
      id: idServices
    });
    return response.status(201).json(service);
  }
}
exports.FindServiceByIdController = FindServiceByIdController;