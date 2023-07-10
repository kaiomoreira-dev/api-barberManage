"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientsRepository = void 0;
var _mongodb = require("mongodb");
var _AppError = require("../../../../../shared/errors/AppError");
var _Clients = _interopRequireDefault(require("../entities/Clients"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ClientsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _Clients.default;
  }
  async create({
    idCompanys,
    name,
    address,
    phone,
    debit,
    num,
    esqd,
    pg,
    military
  }) {
    try {
      const clients = await this.repository.create({
        idCompanys,
        name,
        address,
        phone,
        debit,
        num,
        esqd,
        pg,
        military
      });
      return clients;
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error creating client");
    }
  }
  async list() {
    try {
      return this.repository.find();
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error listing clients");
    }
  }
  async listByCompanyId(idCompanys) {
    try {
      return this.repository.find({
        idCompanys: new _mongodb.ObjectId(idCompanys)
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error listing clients");
    }
  }
  async findById(id) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error finding client");
    }
  }
  async findByCompanyId(idCompanys) {
    try {
      return this.repository.findOne({
        idCompany: idCompanys
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error finding client");
    }
  }
  async findByNameAndIdCompanys(name, idCompanys) {
    try {
      return this.repository.findOne({
        name,
        idCompanys
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error finding client");
    }
  }
  async updatedById({
    id,
    idCompanys,
    name,
    address,
    esqd,
    debit,
    num,
    pg,
    phone,
    military
  }) {
    try {
      await this.repository.findByIdAndUpdate(id, {
        idCompanys,
        name,
        address,
        esqd,
        debit,
        num,
        pg,
        phone,
        military
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error updating client");
    }
  }
  async updateDebitByClientId(id, debit) {
    try {
      await this.repository.findByIdAndUpdate(id, {
        debit
      });
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error updating client");
    }
  }
  async deleteById(id) {
    try {
      await this.repository.findByIdAndDelete(id);
    } catch (error) {
      console.log(error.message);
      throw new _AppError.AppError("Error deleting client");
    }
  }
}
exports.ClientsRepository = ClientsRepository;