"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;
var _tsyringe = require("tsyringe");
var _CreateUserUseCase = require("./CreateUserUseCase");
/* eslint-disable import/no-extraneous-dependencies */

class CreateUserController {
  async handle(request, response) {
    const {
      name,
      email,
      password,
      address,
      phone,
      idCompanys
    } = request.body;
    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);
    await createUserUseCase.execute({
      name,
      email,
      password,
      address,
      phone,
      idCompanys
    });
    return response.status(201).json({
      message: "User created successfully"
    });
  }
}
exports.CreateUserController = CreateUserController;