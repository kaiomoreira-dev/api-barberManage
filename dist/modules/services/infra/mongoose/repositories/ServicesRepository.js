"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServicesRepository = void 0;
var _AppError = require("../../../../../shared/errors/AppError");
var _Services = _interopRequireDefault(require("../entities/Services"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ServicesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _Services.default;
  }
  async create({
    idCompanys,
    name,
    description,
    price
  }) {
    try {
      const services = await this.repository.create({
        idCompanys,
        name,
        description,
        price
      });
      return services;
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error creating service");
    }
  }
  async list() {
    try {
      return this.repository.find();
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error listing services");
    }
  }
  async findById(id) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error finding service");
    }
  }
  async listByCompanyId(idCompanys) {
    try {
      return this.repository.find({
        idCompanys
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error finding company");
    }
  }
  async findServiceByNameAndByCompanyId(idCompanys, name) {
    try {
      return this.repository.findOne({
        name,
        idCompanys
      });
    } catch (error) {
      console.error(error);
      throw new _AppError.AppError("Error finding service");
    }
  }
  async updateById({
    id,
    description,
    name,
    price
  }) {
    try {
      await this.repository.findByIdAndUpdate(id, {
        description,
        name,
        price
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error updating service");
    }
  }
  async deleteById(id) {
    try {
      await this.repository.findByIdAndDelete(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error deleting service");
    }
  }
}
exports.ServicesRepository = ServicesRepository;