"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanysRepository = void 0;
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../../shared/errors/AppError");
var _Companys = _interopRequireDefault(require("../entities/Companys"));
var _dec, _dec2, _dec3, _class;
/* eslint-disable no-return-await */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let CompanysRepository = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class CompanysRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _Companys.default;
  }
  async findByName(name) {
    return await this.repository.findOne({
      name
    });
  }
  async create({
    idUsers,
    name,
    address,
    phone
  }) {
    try {
      const companys = await this.repository.create({
        idUsers,
        name,
        address,
        phone
      });
      return companys;
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error creating company", 500);
    }
  }
  async list() {
    try {
      return this.repository.find();
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error listing companys", 500);
    }
  }
  async findById(id) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error find company", 500);
    }
  }
  async updateById({
    id,
    idUsers,
    name,
    address
  }) {
    try {
      await this.repository.findByIdAndUpdate(id, {
        idUsers,
        name,
        address
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error update company", 500);
    }
  }
  async deleteById(id) {
    try {
      await this.repository.findByIdAndDelete(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error delete company", 500);
    }
  }
}) || _class) || _class) || _class);
exports.CompanysRepository = CompanysRepository;