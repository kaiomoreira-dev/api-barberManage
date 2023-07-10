"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServiceController = void 0;
var _tsyringe = require("tsyringe");
var _ListServicesUseCase = require("./ListServicesUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListServiceController {
  async handle(request, response) {
    const listServicesUseCase = _tsyringe.container.resolve(_ListServicesUseCase.ListServicesUseCase);
    const services = await listServicesUseCase.execute();
    return response.status(200).json(services);
  }
}
exports.ListServiceController = ListServiceController;