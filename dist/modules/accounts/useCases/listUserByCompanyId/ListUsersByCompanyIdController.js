"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersByCompanyIdController = void 0;
var _tsyringe = require("tsyringe");
var _ListUsersByCompanyIdUseCase = require("./ListUsersByCompanyIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListUsersByCompanyIdController {
  async handle(request, response) {
    const {
      idCompanys
    } = request.params;
    const listUsersByCompanyIdUseCase = _tsyringe.container.resolve(_ListUsersByCompanyIdUseCase.ListUsersByCompanyIdUseCase);
    const users = await listUsersByCompanyIdUseCase.execute(idCompanys);
    return response.status(200).json(users);
  }
}
exports.ListUsersByCompanyIdController = ListUsersByCompanyIdController;