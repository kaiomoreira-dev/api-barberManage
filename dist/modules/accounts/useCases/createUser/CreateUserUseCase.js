"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;
var _ensureEmail = require("../../ensures/ensureEmail");
var _ensureName = require("../../ensures/ensureName");
var _ensurePassword = require("../../ensures/ensurePassword");
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _ensurePhone = require("../../../companys/ensures/ensurePhone");
var _bcrypt = require("bcrypt");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
/* eslint-disable import/no-extraneous-dependencies */
let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({
    name,
    email,
    password,
    address,
    phone
  }) {
    if ((0, _ensureName.ensureName)(name)) {
      throw new _AppError.AppError("Name is not available", 401);
    }
    if (!(0, _ensureEmail.ensureEmail)(email)) {
      throw new _AppError.AppError("Email not valid", 401);
    }
    if (!(0, _ensurePhone.ensurePhone)(phone)) {
      throw new _AppError.AppError("phone is not available", 401);
    }
    const checkEmailUserExist = await this.userRepository.findByEmail(email);
    if (checkEmailUserExist) {
      throw new _AppError.AppError("Email already exists", 401);
    }
    if ((0, _ensurePassword.ensurePassword)(password)) {
      throw new _AppError.AppError("Password low lenght", 401);
    }
    const passwordHash = await (0, _bcrypt.hash)(password, 8);

    // Validar se compania existe!!

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      address,
      phone
    });
    return user;
  }
}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;