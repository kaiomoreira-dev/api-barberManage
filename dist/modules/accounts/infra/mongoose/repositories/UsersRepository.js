"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../../shared/errors/AppError");
var _Users = _interopRequireDefault(require("../entities/Users"));
var _dec, _dec2, _dec3, _class;
/* eslint-disable import/no-extraneous-dependencies */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let UsersRepository = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _Users.default;
  }
  async create({
    name,
    email,
    password,
    address,
    phone
  }) {
    try {
      const user = await this.repository.create({
        name,
        email,
        password,
        address,
        phone
      });
      return user;
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error creating user", 500);
    }
  }
  async findById(id) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error find user", 500);
    }
  }
  async findByEmail(email) {
    try {
      return this.repository.findOne({
        email
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error find user", 500);
    }
  }
  async findByIdCompany(idCompanys) {
    try {
      return this.repository.findById(idCompanys);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error find company", 500);
    }
  }
  async updateById({
    id,
    name,
    address,
    email,
    password,
    phone
  }) {
    try {
      await this.repository.findByIdAndUpdate(id, {
        name,
        address,
        email,
        password,
        phone
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error updating user", 500);
    }
  }
  async deleteById(id) {
    try {
      await this.repository.findByIdAndDelete(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error deleting user", 500);
    }
  }
}) || _class) || _class) || _class);
exports.UsersRepository = UsersRepository;