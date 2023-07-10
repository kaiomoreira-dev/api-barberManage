"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindUserByIdController = void 0;
var _tsyringe = require("tsyringe");
var _FindUserByIdUseCase = require("./FindUserByIdUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class FindUserByIdController {
  async handle(request, response) {
    const {
      idUsers: id
    } = request.params;
    const findUserByIdUseCase = _tsyringe.container.resolve(_FindUserByIdUseCase.FindUserByIdUseCase);
    const user = await findUserByIdUseCase.execute(id);
    return response.status(200).json(user);
  }
}
exports.FindUserByIdController = FindUserByIdController;