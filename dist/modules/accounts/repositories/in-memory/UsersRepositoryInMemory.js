"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositoryInMemory = void 0;
var _faker = require("@faker-js/faker");
var _Users = _interopRequireDefault(require("../../infra/mongoose/entities/Users"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

class UsersRepositoryInMemory {
  constructor() {
    this.repository = [];
  }
  async findById(id) {
    return this.repository.find(user => user.id === id);
  }
  async create({
    name,
    email,
    password,
    address
  }) {
    const user = new _Users.default();
    const generateID = _faker.faker.datatype.uuid();
    Object.assign(user, {
      id: generateID,
      name,
      email,
      password,
      address
    });
    this.repository.push(user);
    return user;
  }
  async list() {
    return this.repository;
  }
  async findByEmail(email) {
    return this.repository.find(user => user.email === email);
  }
  async findByIdCompany(idCompanys) {
    throw new Error("Not implemented");
  }
  async updateById(id, name, address, email, password) {
    const userIndex = this.repository.findIndex(user => user.id === id);
    this.repository[userIndex].name = name;
    this.repository[userIndex].email = email;
    this.repository[userIndex].password = password;
    this.repository[userIndex].address = address;
  }
  async deleteById(id) {
    const userIndex = this.repository.findIndex(user => user.id === id);
    this.repository.splice(userIndex, 1);
  }
}
exports.UsersRepositoryInMemory = UsersRepositoryInMemory;