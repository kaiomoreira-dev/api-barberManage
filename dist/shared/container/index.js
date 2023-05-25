"use strict";

var _UsersRepository = require("../../modules/accounts/infra/mongoose/repositories/UsersRepository");
var _CompanysRepository = require("../../modules/companys/infra/mongoose/repositories/CompanysRepository");
var _tsyringe = require("tsyringe");
require("./in-memory");
/* eslint-disable import/no-extraneous-dependencies */

_tsyringe.container.register("UsersRepository", {
  useClass: _UsersRepository.UsersRepository
});
_tsyringe.container.register("CompanysRepository", {
  useClass: _CompanysRepository.CompanysRepository
});