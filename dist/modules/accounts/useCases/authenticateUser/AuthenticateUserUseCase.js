"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;
var _auth = _interopRequireDefault(require("../../../../config/auth"));
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _bcrypt = require("bcrypt");
var _jsonwebtoken = require("jsonwebtoken");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _IRefreshTokensRepository = require("../../repositories/IRefreshTokensRepository");
var _ensureEmail = require("../../../../ensures/ensureEmail");
var _ensurePassword = require("../../../../ensures/ensurePassword");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
/* eslint-disable import/no-unresolved */
/* eslint-disable import-helpers/order-imports */
/* eslint-disable import/no-extraneous-dependencies */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("RefreshTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IRefreshTokensRepository.IRefreshTokensRepository === "undefined" ? Object : _IRefreshTokensRepository.IRefreshTokensRepository, typeof _DayjsDateProvider.DayjsDateProvider === "undefined" ? Object : _DayjsDateProvider.DayjsDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(userRepository, refreshTokensRepository, dateProvider) {
    this.userRepository = userRepository;
    this.refreshTokensRepository = refreshTokensRepository;
    this.dateProvider = dateProvider;
  }
  async execute({
    email,
    password
  }) {
    if (!(0, _ensureEmail.ensureEmail)(email)) {
      throw new _AppError.AppError("Email not valid", 401);
    }
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) {
      throw new _AppError.AppError("Email or password incorrect", 401);
    }
    if ((0, _ensurePassword.ensurePassword)(password)) {
      throw new _AppError.AppError("Password low lenght", 401);
    }
    const checkPasswordIsValid = await (0, _bcrypt.compare)(password, userExists.password);
    if (!checkPasswordIsValid) {
      throw new _AppError.AppError("Email or password incorrect", 401);
    }
    const {
      name,
      id,
      email: userEmail
    } = userExists;
    const token = (0, _jsonwebtoken.sign)({
      name,
      userEmail
    }, _auth.default.secretToken, {
      subject: String(id),
      expiresIn: _auth.default.expireInToken
    });
    const refreshToken = (0, _jsonwebtoken.sign)({
      userEmail
    }, _auth.default.secretRefreshToken, {
      subject: String(id),
      expiresIn: _auth.default.expireRefreshToken
    });
    const expireDateFormat = this.dateProvider.addDays(_auth.default.daysRefreshToken);
    await this.refreshTokensRepository.create({
      idUsers: id,
      refreshToken,
      expireDate: expireDateFormat
    });
    const userInfo = {
      user: {
        id,
        name,
        email,
        admin: userExists.admin,
        employee: userExists.employee,
        idCompanys: userExists.idCompanys
      },
      token,
      refreshToken
    };
    return userInfo;
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;