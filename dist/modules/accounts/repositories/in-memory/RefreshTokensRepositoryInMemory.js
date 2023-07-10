"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokensRepositoryInMemory = void 0;
var _faker = require("@faker-js/faker");
var _RefreshTokens = require("../../infra/typeorm/entities/RefreshTokens");
/* eslint-disable import/no-extraneous-dependencies */

class RefreshTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }
  async create({
    refresh_token,
    expire_date,
    id_users
  }) {
    const refreshToken = new _RefreshTokens.RefreshTokens();
    const generateID = _faker.faker.datatype.uuid();
    Object.assign(refreshToken, {
      id: generateID,
      refresh_token,
      expire_date,
      id_users
    });
    this.usersTokens.push(refreshToken);
    return refreshToken;
  }
  async findRefreshTokenByUserIdAndRefreshToken(id_users, refresh_token) {
    const refreshToken = this.usersTokens.find(token => token.id_users === id_users && token.refresh_token === refresh_token);
    return refreshToken;
  }
  async deleteById(id) {
    const refreshToken = this.usersTokens.find(token => token.id_users === id);
    this.usersTokens.splice(this.usersTokens.indexOf(refreshToken));
  }
}
exports.RefreshTokensRepositoryInMemory = RefreshTokensRepositoryInMemory;