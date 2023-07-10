"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;
var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");
var _DeleteUserByIdController = require("../../../../modules/accounts/useCases/deleteById/DeleteUserByIdController");
var _FindUserByIdController = require("../../../../modules/accounts/useCases/findUserById/FindUserByIdController");
var _ListUsersByCompanyIdController = require("../../../../modules/accounts/useCases/listUserByCompanyId/ListUsersByCompanyIdController");
var _ListUsersController = require("../../../../modules/accounts/useCases/listUsers/ListUsersController");
var _UpdateUsersController = require("../../../../modules/accounts/useCases/updateUser/UpdateUsersController");
var _express = require("express");
var _ensureAdmin = require("../middlewares/ensureAdmin");
var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");
const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const createUserController = new _CreateUserController.CreateUserController();
const findUserByIdController = new _FindUserByIdController.FindUserByIdController();
const listUsersByCompanyIdController = new _ListUsersByCompanyIdController.ListUsersByCompanyIdController();
const updateUsersController = new _UpdateUsersController.UpdateUsersController();
const deleteUserByIdController = new _DeleteUserByIdController.DeleteUserByIdController();
const listUsersController = new _ListUsersController.ListUsersController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/:idUsers", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, findUserByIdController.handle);
usersRoutes.get("/", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, listUsersController.handle);
usersRoutes.get("/company/:idCompanys", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, listUsersByCompanyIdController.handle);
usersRoutes.put("/:idUsers", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, updateUsersController.handle);
usersRoutes.delete("/:idUsers", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, deleteUserByIdController.handle);

// criar rota para atualizar qualquer user para administrador
// Mas com apenas permissão de desenvolvedor