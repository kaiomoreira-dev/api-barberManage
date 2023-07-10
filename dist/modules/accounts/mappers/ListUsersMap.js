"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersMap = void 0;
var _classTransformer = require("class-transformer");
/* eslint-disable import/no-extraneous-dependencies */

class ListUsersMap {
  static toDTOArray(users) {
    return users.map(({
      id,
      name,
      email,
      address,
      idCompanys,
      phone,
      admin,
      employee,
      createdAt,
      updatedAt
    }) => {
      const user = (0, _classTransformer.instanceToInstance)({
        id,
        name,
        email,
        phone,
        address,
        admin,
        employee,
        idCompanys,
        createdAt,
        updatedAt
      });
      return user;
    });
  }
}
exports.ListUsersMap = ListUsersMap;