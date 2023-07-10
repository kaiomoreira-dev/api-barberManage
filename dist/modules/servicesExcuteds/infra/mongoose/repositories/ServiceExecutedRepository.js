"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceExecutedRepository = void 0;
var _AppError = require("../../../../../shared/errors/AppError");
var _ServiceExecuted = _interopRequireDefault(require("../entities/ServiceExecuted"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ServiceExecutedRepository {
  constructor() {
    this.repository = void 0;
    this.pageSize = void 0;
    this.repository = _ServiceExecuted.default;
    this.pageSize = 11;
  }
  async create({
    idClients,
    idCompanys,
    idServices,
    idUsers,
    paymentDate,
    paymentMethod,
    serviceDate,
    value,
    isLogged
  }) {
    try {
      const servicesExcuted = this.repository.create({
        idClients,
        idCompanys,
        idServices,
        idUsers,
        isLogged,
        paymentDate,
        paymentMethod,
        serviceDate,
        value
      });
      return servicesExcuted;
    } catch (error) {
      console.log(error);
      throw new _AppError.AppError("Error creating ServiceExcuted");
    }
  }
  async findById(id) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      console.log(error);
      throw new _AppError.AppError("Error find ServiceExcuted");
    }
  }
  async listByCompanyId(pageNumber, idCompanys) {
    try {
      const skip = (pageNumber - 1) * this.pageSize;
      return this.repository.find({
        idCompanys
      }).sort({
        _id: -1
      }).limit(this.pageSize).skip(skip).exec();
    } catch (error) {
      console.log(error);
      throw new _AppError.AppError("Error list ServiceExcuted");
    }
  }
  async listByServiceId(idServices) {
    try {
      return this.repository.find({
        idServices
      });
    } catch (error) {
      console.log(error);
      throw new _AppError.AppError("Error list ServiceExcuted");
    }
  }
  async listByClientsId(idClients) {
    try {
      return this.repository.find({
        idClients
      });
    } catch (error) {
      console.log(error);
      throw new _AppError.AppError("Error list ServiceExcuted");
    }
  }
  async listByUserId(idUsers) {
    try {
      return this.repository.find({
        idUsers
      });
    } catch (error) {
      console.log(error);
      throw new _AppError.AppError("Error list ServiceExcuted");
    }
  }
  async updateById({
    id,
    idClients,
    paymentDate,
    paymentMethod
  }) {
    try {
      return this.repository.findByIdAndUpdate(id, {
        idClients,
        paymentDate,
        paymentMethod
      });
    } catch (error) {
      console.log(error);
      throw new _AppError.AppError("Error updated ServiceExcuted");
    }
  }
  async deleteById(id) {
    try {
      return this.repository.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new _AppError.AppError("Error deleted ServiceExcuted");
    }
  }
}
exports.ServiceExecutedRepository = ServiceExecutedRepository;