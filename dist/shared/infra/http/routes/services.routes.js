"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesRoutes = void 0;
var _CreateServiceController = require("../../../../modules/services/useCases/createService/CreateServiceController");
var _DeleteServiceByIdController = require("../../../../modules/services/useCases/deleteServiceById/DeleteServiceByIdController");
var _FindServiceByIdController = require("../../../../modules/services/useCases/findServiceById/FindServiceByIdController");
var _ListServicesControlle = require("../../../../modules/services/useCases/listServices/ListServicesControlle");
var _ListServicesByCompanyIdController = require("../../../../modules/services/useCases/listServicesByCompanyId/ListServicesByCompanyIdController");
var _UpdateServiceByIdController = require("../../../../modules/services/useCases/updateServiceById/UpdateServiceByIdController");
var _express = require("express");
var _ensureAdmin = require("../middlewares/ensureAdmin");
var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");
const servicesRoutes = (0, _express.Router)();
exports.servicesRoutes = servicesRoutes;
const createServiceController = new _CreateServiceController.CreateServiceController();
const listServiceController = new _ListServicesControlle.ListServiceController();
const listServicesByCompanyIdController = new _ListServicesByCompanyIdController.ListServicesByCompanyIdController();
const updateServiceByIdController = new _UpdateServiceByIdController.UpdateServiceByIdController();
const findServiceByIdController = new _FindServiceByIdController.FindServiceByIdController();
const deleteServiceByIdController = new _DeleteServiceByIdController.DeleteServiceByIdController();
servicesRoutes.post("/:idCompanys", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, createServiceController.handle);
servicesRoutes.get("/", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, listServiceController.handle);
servicesRoutes.get("/companys/:idCompanys", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, listServicesByCompanyIdController.handle);
servicesRoutes.get("/:idServices", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, findServiceByIdController.handle);
servicesRoutes.put("/:idServices", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, updateServiceByIdController.handle);
servicesRoutes.delete("/:idServices", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, deleteServiceByIdController.handle);