"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListClientsController = void 0;
var _tsyringe = require("tsyringe");
var _LIstClientsUseCase = require("./LIstClientsUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListClientsController {
  async handle(request, response) {
    const listClientsUseCase = _tsyringe.container.resolve(_LIstClientsUseCase.ListClientsUseCase);
    const clients = await listClientsUseCase.execute();
    return response.status(200).json(clients);
  }
}
exports.ListClientsController = ListClientsController;