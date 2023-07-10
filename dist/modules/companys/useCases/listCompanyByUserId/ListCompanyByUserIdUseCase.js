"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCompanyByUserIdUseCase = void 0;
var _IUsersRepository = require("../../../accounts/repositories/IUsersRepository");
var _ICompanysRepository = require("../../repositories/ICompanysRepository");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let ListCompanyByUserIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CompanysRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICompanysRepository.ICompanysRepository === "undefined" ? Object : _ICompanysRepository.ICompanysRepository, typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListCompanyByUserIdUseCase {
  constructor(companysRepository, userRepository) {
    this.companysRepository = companysRepository;
    this.userRepository = userRepository;
  }
  async execute(idUsers) {
    const companys = await this.companysRepository.listByUserId(idUsers);
    return companys;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.ListCompanyByUserIdUseCase = ListCompanyByUserIdUseCase;