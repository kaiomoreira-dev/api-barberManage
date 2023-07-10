"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokensRepository = void 0;
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../../shared/errors/AppError");
var _RefreshTokens = _interopRequireDefault(require("../entities/RefreshTokens"));
var _dec, _dec2, _dec3, _class;
/* eslint-disable import/no-extraneous-dependencies */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let RefreshTokensRepository = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class RefreshTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _RefreshTokens.default;
  }
  async create({
    idUsers,
    refreshToken,
    expireDate
  }) {
    try {
      const createRefreshToken = await this.repository.create({
        idUsers,
        refreshToken,
        expireDate
      });
      return createRefreshToken;
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error creating refresh tokens");
    }
  }
  async findRefreshTokenByUserIdAndRefreshToken(idUsers, refreshToken) {
    try {
      return this.repository.findOne({
        idUsers,
        refreshToken
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error finding refresh tokens");
    }
  }
  async deleteById(id) {
    try {
      await this.repository.findByIdAndDelete(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error deleting refresh tokens");
    }
  }
}) || _class) || _class) || _class);
exports.RefreshTokensRepository = RefreshTokensRepository;