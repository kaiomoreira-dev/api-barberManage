"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CostsRepository = void 0;
var _AppError = require("../../../../shared/errors/AppError");
var _Cost = _interopRequireDefault(require("../entities/Cost"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CostsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _Cost.default;
  }
  async create({
    description,
    costDate,
    value,
    idCompanys
  }) {
    try {
      const costs = await this.repository.create({
        description,
        value,
        costDate,
        idCompanys
      });
      return costs;
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error creating cost");
    }
  }
  async list() {
    try {
      const costs = await this.repository.find();
      return costs;
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error listing companys");
    }
  }
  async listByIdCompany(idCompanys) {
    try {
      const costs = await this.repository.find({
        idCompanys
      });
      return costs;
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error listing companys");
    }
  }
  async findById(id) {
    try {
      const costs = await this.repository.findById(id);
      return costs;
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error listing companys");
    }
  }
  async updateById({
    id,
    idCompanys,
    description,
    costDate,
    value
  }) {
    try {
      await this.repository.findByIdAndUpdate(id, {
        description,
        value,
        costDate,
        idCompanys
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error update company");
    }
  }
  async deleteById(id) {
    try {
      await this.repository.findByIdAndDelete(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error delete company");
    }
  }
}
exports.CostsRepository = CostsRepository;