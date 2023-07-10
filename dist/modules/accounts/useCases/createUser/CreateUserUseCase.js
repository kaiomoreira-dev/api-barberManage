"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;
var _ensureEmail = require("../../../../ensures/ensureEmail");
var _ensureId = require("../../../../ensures/ensureId");
var _ensureName = require("../../../../ensures/ensureName");
var _ensurePassword = require("../../../../ensures/ensurePassword");
var _ensurePhone = require("../../../../ensures/ensurePhone");
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _bcrypt = require("bcrypt");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserUseCase {
  constructor(userRepository, companysRepository) {
    this.userRepository = userRepository;
    this.companysRepository = companysRepository;
  }
  async execute({
    name,
    email,
    password,
    address,
    phone,
    idCompanys
  }) {
    if (!(0, _ensureName.ensureName)(name)) {
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
    for (const company of idCompanys) {
      if (!(0, _ensureId.ensureId)(String(company))) {
        throw new _AppError.AppError("Company not found", 401);
      }

      // eslint-disable-next-line no-await-in-loop
      const checkCompanyExists = await this.companysRepository.findById(String(company));
      if (!checkCompanyExists) {
        throw new _AppError.AppError("Company not found", 401);
      }
    }
    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      address,
      phone,
      idCompanys
    });
    if (idCompanys.length > 0) {
      for (const company of user.idCompanys) {
        // eslint-disable-next-line no-await-in-loop
        await this.companysRepository.updateListUsersById(String(company), user.id);
      }
    }
    return user;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;