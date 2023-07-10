"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientsRoutes = void 0;
var _CreateClientsController = require("../../../../modules/clients/useCases/createClient/CreateClientsController");
var _DeleteClientByIdController = require("../../../../modules/clients/useCases/deleteClientById/DeleteClientByIdController");
var _FindClientByIdController = require("../../../../modules/clients/useCases/findClientById/FindClientByIdController");
var _ListClientByCompanyIdController = require("../../../../modules/clients/useCases/listClientByCompanyId/ListClientByCompanyIdController");
var _LIstClientsController = require("../../../../modules/clients/useCases/listClients/LIstClientsController");
var _UpdateClientByIdController = require("../../../../modules/clients/useCases/updateClientById/UpdateClientByIdController");
var _UpdateDebitByClientIdController = require("../../../../modules/clients/useCases/updateDebitByClientId/UpdateDebitByClientIdController");
var _express = require("express");
var _ensureAdmin = require("../middlewares/ensureAdmin");
var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");
var _ensureEmployee = require("../middlewares/ensureEmployee");
const clientsRoutes = (0, _express.Router)();
exports.clientsRoutes = clientsRoutes;
const createClientsController = new _CreateClientsController.CreateClientsController();
const findClientByIdController = new _FindClientByIdController.FindClientByIdController();
const listClientsController = new _LIstClientsController.ListClientsController();
const listClientByCompanyIdController = new _ListClientByCompanyIdController.ListClientByCompanyIdController();
const updateClientByIdController = new _UpdateClientByIdController.UpdateClientByIdController();
const updateDebitByClientIdController = new _UpdateDebitByClientIdController.UpdateDebitByClientIdController();
const deleteClientByIdController = new _DeleteClientByIdController.DeleteClientByIdController();
clientsRoutes.post("/", _ensureAuthenticate.ensureAuthenticate, createClientsController.handle);
clientsRoutes.get("/", _ensureAuthenticate.ensureAuthenticate, listClientsController.handle);
clientsRoutes.get("/companys/:idCompanys", _ensureAuthenticate.ensureAuthenticate, _ensureEmployee.ensureEmployee, listClientByCompanyIdController.handle);
clientsRoutes.get("/:idClients", _ensureAuthenticate.ensureAuthenticate, _ensureEmployee.ensureEmployee, findClientByIdController.handle);
clientsRoutes.put("/:idClients", _ensureAuthenticate.ensureAuthenticate, _ensureEmployee.ensureEmployee, updateClientByIdController.handle);
clientsRoutes.patch("/:idClients", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, updateDebitByClientIdController.handle);
clientsRoutes.delete("/:idClients", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, deleteClientByIdController.handle);