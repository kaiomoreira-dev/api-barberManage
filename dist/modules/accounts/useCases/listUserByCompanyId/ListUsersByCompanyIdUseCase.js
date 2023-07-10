"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersByCompanyIdUseCase = void 0;
var _ensureId = require("../../../../ensures/ensureId");
var _ListUsersMap = require("../../mappers/ListUsersMap");
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _ICompanysRepository = require("../../../companys/repositories/ICompanysRepository");
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let ListUsersByCompanyIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListUsersByCompanyIdUseCase {
  constructor(usersRepository, companysRepository) {
    this.usersRepository = usersRepository;
    this.companysRepository = companysRepository;
  }
  async execute(idCompanys) {
    if (!(0, _ensureId.ensureId)(idCompanys)) {
      throw new _AppError.AppError("Company not found", 401);
    }
    const checkCompanyExist = await this.companysRepository.findById(idCompanys);
    if (!checkCompanyExist) {
      throw new _AppError.AppError("Company not found", 404);
    }
    const users = await this.usersRepository.listByCompanyId(idCompanys);
    return _ListUsersMap.ListUsersMap.toDTOArray(users);
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.ListUsersByCompanyIdUseCase = ListUsersByCompanyIdUseCase;