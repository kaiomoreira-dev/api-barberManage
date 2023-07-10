"use strict";

var _UsersRepositoryInMemory = require("../../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
var _tsyringe = require("tsyringe");
_tsyringe.container.registerSingleton("UsersRepositoryInMemory", _UsersRepositoryInMemory.UsersRepositoryInMemory);