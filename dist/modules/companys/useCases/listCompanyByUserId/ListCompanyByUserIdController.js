"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCompanyByUserIdController = void 0;
var _tsyringe = require("tsyringe");
var _ListCompanyByUserIdUseCase = require("./ListCompanyByUserIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListCompanyByUserIdController {
  async handle(request, response) {
    const {
      id
    } = request.user;
    const listCompanyByUserIdUseCase = _tsyringe.container.resolve(_ListCompanyByUserIdUseCase.ListCompanyByUserIdUseCase);
    const clients = await listCompanyByUserIdUseCase.execute(id);
    return response.status(200).json(clients);
  }
}
exports.ListCompanyByUserIdController = ListCompanyByUserIdController;