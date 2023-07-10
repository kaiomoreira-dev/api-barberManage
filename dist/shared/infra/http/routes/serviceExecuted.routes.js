"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesExcuteds = void 0;
var _CreateServiceExecutedController = require("../../../../modules/servicesExcuteds/useCases/createServiceExecuted/CreateServiceExecutedController");
var _DeleteServiceExecutedByIdController = require("../../../../modules/servicesExcuteds/useCases/deleteServiceExecutedById/DeleteServiceExecutedByIdController");
var _FindServiceExecutedByIdController = require("../../../../modules/servicesExcuteds/useCases/findServiceExecutedById/FindServiceExecutedByIdController");
var _ListServiceExecutedByClientIdController = require("../../../../modules/servicesExcuteds/useCases/listServiceExecutedByClientId/ListServiceExecutedByClientIdController");
var _ListServiceExecutedByCompanyIdController = require("../../../../modules/servicesExcuteds/useCases/listServiceExecutedByCompanyId/ListServiceExecutedByCompanyIdController");
var _ListServiceExecutedByServiceIdController = require("../../../../modules/servicesExcuteds/useCases/listServiceExecutedByServiceId/ListServiceExecutedByServiceIdController");
var _ListServiceExecutedByUserIdController = require("../../../../modules/servicesExcuteds/useCases/listServiceExecutedByUserId/ListServiceExecutedByUserIdController");
var _UpdateServiceExecutedByIdController = require("../../../../modules/servicesExcuteds/useCases/updateServiceExecutedById/UpdateServiceExecutedByIdController");
var _express = require("express");
var _ensureAdmin = require("../middlewares/ensureAdmin");
var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");
var _ensureEmployee = require("../middlewares/ensureEmployee");
const servicesExcuteds = (0, _express.Router)();
exports.servicesExcuteds = servicesExcuteds;
const createServiceExecutedController = new _CreateServiceExecutedController.CreateServiceExecutedController();
const findServiceExecutedByIdController = new _FindServiceExecutedByIdController.FindServiceExecutedByIdController();
const listServiceExecutedByClientIdController = new _ListServiceExecutedByClientIdController.ListServiceExecutedByClientIdController();
const listServiceExecutedByCompanyIdController = new _ListServiceExecutedByCompanyIdController.ListServiceExecutedByCompanyIdController();
const listServiceExecutedByServiceIdController = new _ListServiceExecutedByServiceIdController.ListServiceExecutedByServiceIdController();
const listServiceExecutedByUserIdController = new _ListServiceExecutedByUserIdController.ListServiceExecutedByUserIdController();
const updateServiceExecutedByIdController = new _UpdateServiceExecutedByIdController.UpdateServiceExecutedByIdController();
const deleteServiceExecutedByIdController = new _DeleteServiceExecutedByIdController.DeleteServiceExecutedByIdController();
servicesExcuteds.post("/", _ensureAuthenticate.ensureAuthenticate, _ensureEmployee.ensureEmployee, createServiceExecutedController.handle);
servicesExcuteds.get("/:idServiceExecuted", _ensureAuthenticate.ensureAuthenticate, _ensureEmployee.ensureEmployee, findServiceExecutedByIdController.handle);
servicesExcuteds.get("/client/:idClients", _ensureAuthenticate.ensureAuthenticate, _ensureEmployee.ensureEmployee, listServiceExecutedByClientIdController.handle);
servicesExcuteds.get("/company/:idCompanys", _ensureAuthenticate.ensureAuthenticate, _ensureEmployee.ensureEmployee, listServiceExecutedByCompanyIdController.handle);
servicesExcuteds.get("/service/:idServices", _ensureAuthenticate.ensureAuthenticate, _ensureEmployee.ensureEmployee, listServiceExecutedByServiceIdController.handle);
servicesExcuteds.get("/user/:idUsers", _ensureAuthenticate.ensureAuthenticate, _ensureEmployee.ensureEmployee, listServiceExecutedByUserIdController.handle);
servicesExcuteds.delete("/:idServiceExecuted", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, deleteServiceExecutedByIdController.handle);
servicesExcuteds.put("/:idServiceExecuted", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, updateServiceExecutedByIdController.handle);