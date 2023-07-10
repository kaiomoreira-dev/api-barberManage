"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersController = void 0;
var _tsyringe = require("tsyringe");
var _ListUsersUseCase = require("./ListUsersUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class ListUsersController {
  async handle(request, response) {
    const listUsersUseCase = _tsyringe.container.resolve(_ListUsersUseCase.ListUsersUseCase);
    const users = await listUsersUseCase.execute();
    return response.status(200).json(users);
  }
}
exports.ListUsersController = ListUsersController;