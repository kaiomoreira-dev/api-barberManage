"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindClientByIdController = void 0;
var _tsyringe = require("tsyringe");
var _FindClientByIdUseCase = require("./FindClientByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class FindClientByIdController {
  async handle(request, response) {
    const {
      idClients
    } = request.params;
    const findClientByIdUseCase = _tsyringe.container.resolve(_FindClientByIdUseCase.FindClientByIdUseCase);
    const company = await findClientByIdUseCase.execute({
      id: idClients
    });
    return response.status(200).json(company);
  }
}
exports.FindClientByIdController = FindClientByIdController;