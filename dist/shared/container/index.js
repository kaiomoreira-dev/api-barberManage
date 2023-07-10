"use strict";

var _UsersRepository = require("../../modules/accounts/infra/mongoose/repositories/UsersRepository");
var _CompanysRepository = require("../../modules/companys/infra/mongoose/repositories/CompanysRepository");
require("./in-memory");
require("./providers");
var _CostsRepository = require("../../modules/costs/infra/repositories/CostsRepository");
var _ServicesRepository = require("../../modules/services/infra/mongoose/repositories/ServicesRepository");
var _ServiceExecutedRepository = require("../../modules/servicesExcuteds/infra/mongoose/repositories/ServiceExecutedRepository");
var _tsyringe = require("tsyringe");
var _ClientsRepository = require("../../modules/clients/infra/mongoose/repositories/ClientsRepository");
var _RefreshTokensRepository = require("../../modules/accounts/infra/mongoose/repositories/RefreshTokensRepository");
/* eslint-disable import/no-extraneous-dependencies */

_tsyringe.container.register("UsersRepository", {
  useClass: _UsersRepository.UsersRepository
});
_tsyringe.container.register("CompanysRepository", {
  useClass: _CompanysRepository.CompanysRepository
});
_tsyringe.container.register("ServicesRepository", {
  useClass: _ServicesRepository.ServicesRepository
});
_tsyringe.container.register("CostsRepository", {
  useClass: _CostsRepository.CostsRepository
});
_tsyringe.container.register("ClientsRepository", {
  useClass: _ClientsRepository.ClientsRepository
});
_tsyringe.container.register("RefreshTokensRepository", {
  useClass: _RefreshTokensRepository.RefreshTokensRepository
});
_tsyringe.container.register("ServiceExecutedRepository", {
  useClass: _ServiceExecutedRepository.ServiceExecutedRepository
});