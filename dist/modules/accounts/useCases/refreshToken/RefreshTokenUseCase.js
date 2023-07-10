"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;
var _auth = _interopRequireDefault(require("../../../../config/auth"));
var _IRefreshTokensRepository = require("../../repositories/IRefreshTokensRepository");
var _jsonwebtoken = require("jsonwebtoken");
var _tsyringe = require("tsyringe");
var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RefreshTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IRefreshTokensRepository.IRefreshTokensRepository === "undefined" ? Object : _IRefreshTokensRepository.IRefreshTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(refreshTokensRepository, daysjsDateProvider) {
    this.refreshTokensRepository = refreshTokensRepository;
    this.daysjsDateProvider = daysjsDateProvider;
  }
  async execute(token) {
    const {
      sub,
      email
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secretRefreshToken);
    const idUsers = sub;
    const userToken = await this.refreshTokensRepository.findRefreshTokenByUserIdAndRefreshToken(idUsers, token);
    if (!userToken) {
      throw new _AppError.AppError("Refresh token not found", 404);
    }
    await this.refreshTokensRepository.deleteById(userToken.id);
    const refreshToken = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secretRefreshToken, {
      subject: idUsers,
      expiresIn: _auth.default.expireRefreshToken
    });
    const expire_date_refresh_token = this.daysjsDateProvider.addDays(_auth.default.daysRefreshToken);
    await this.refreshTokensRepository.create({
      idUsers,
      refreshToken,
      expireDate: expire_date_refresh_token
    });
    const newToken = (0, _jsonwebtoken.sign)({}, _auth.default.secretToken, {
      subject: idUsers,
      expiresIn: _auth.default.expireInToken
    });
    return {
      refreshToken,
      token: newToken
    };
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;