"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateClientsController = void 0;
var _tsyringe = require("tsyringe");
var _CreateClientsUseCase = require("./CreateClientsUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class CreateClientsController {
  async handle(request, response) {
    const {
      idCompanys,
      name,
      address,
      esqd,
      num,
      pg,
      phone,
      military
    } = request.body;
    const createClientsUseCase = _tsyringe.container.resolve(_CreateClientsUseCase.CreateClientsUseCase);
    const clients = await createClientsUseCase.execute({
      idCompanys,
      name,
      address,
      esqd,
      num,
      pg,
      phone,
      military
    });
    return response.status(201).json(clients);
  }
}
exports.CreateClientsController = CreateClientsController;