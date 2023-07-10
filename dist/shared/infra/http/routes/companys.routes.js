"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.companysRoutes = void 0;
var _CreateCompanyController = require("../../../../modules/companys/useCases/createCompany/CreateCompanyController");
var _DeleteCompanysByIdController = require("../../../../modules/companys/useCases/deleteById/DeleteCompanysByIdController");
var _FindCompanyByIdController = require("../../../../modules/companys/useCases/findById/FindCompanyByIdController");
var _ListCompanyByUserIdController = require("../../../../modules/companys/useCases/listCompanyByUserId/ListCompanyByUserIdController");
var _UpdateCompanysByIdController = require("../../../../modules/companys/useCases/updateById/UpdateCompanysByIdController");
var _express = require("express");
var _ensureAdmin = require("../middlewares/ensureAdmin");
var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");
var _ensureEmployee = require("../middlewares/ensureEmployee");
const companysRoutes = (0, _express.Router)();
exports.companysRoutes = companysRoutes;
const createCompanyController = new _CreateCompanyController.CreateCompanyController();
const findCompanyByIdController = new _FindCompanyByIdController.FindCompanyByIdController();
const listCompanyByUserIdController = new _ListCompanyByUserIdController.ListCompanyByUserIdController();
const updateCompanyByIdController = new _UpdateCompanysByIdController.UpdateCompanyByIdController();
const deleteCompanyByIdController = new _DeleteCompanysByIdController.DeleteCompanyByIdController();
companysRoutes.post("/", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, createCompanyController.handle);
companysRoutes.get("/", _ensureAuthenticate.ensureAuthenticate, _ensureEmployee.ensureEmployee, listCompanyByUserIdController.handle);
companysRoutes.get("/:idCompanys", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, findCompanyByIdController.handle);
companysRoutes.put("/:idCompanys", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, updateCompanyByIdController.handle);
companysRoutes.delete("/:idCompanys", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, deleteCompanyByIdController.handle);