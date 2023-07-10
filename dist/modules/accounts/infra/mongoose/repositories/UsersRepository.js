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
  async list() {
    try {
      return await this.repository.find();
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error finding user");
    }
  }
  async create({
    name,
    email,
    password,
    address,
    phone,
    idCompanys
  }) {
    try {
      const user = await this.repository.create({
        name,
        email,
        password,
        address,
        phone,
        idCompanys
      });
      return user;
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error creating user");
    }
  }
  async findById(id) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error find user");
    }
  }
  async findByEmail(email) {
    try {
      return this.repository.findOne({
        email
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error find user");
    }
  }
  async listByCompanyId(idCompanys) {
    try {
      return this.repository.find({
        idCompanys
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error find company");
    }
  }
  async updateById({
    id,
    name,
    address,
    email,
    password,
    phone,
    idCompanys
  }) {
    try {
      await this.repository.findByIdAndUpdate(id, {
        name,
        address,
        email,
        password,
        phone,
        $set: {
          idCompanys
        }
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error updating user");
    }
  }
  async updateCompanysIdsByCompanyId(idCompanys) {
    try {
      await this.repository.updateMany({
        idCompanys
      }, {
        $pull: {
          idCompanys
        }
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error updating companysIds");
    }
  }
  async deleteById(id) {
    try {
      await this.repository.findByIdAndDelete(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error deleting user");
    }
  }
}) || _class) || _class) || _class);
exports.UsersRepository = UsersRepository;