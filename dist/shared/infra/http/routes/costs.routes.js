"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.costRoutes = void 0;
var _CreateCostController = require("../../../../modules/costs/useCases/createCost/CreateCostController");
var _DeleteCostByIdController = require("../../../../modules/costs/useCases/deleteById/DeleteCostByIdController");
var _FindByIdController = require("../../../../modules/costs/useCases/findById/FindByIdController");
var _ListByIdCompanysController = require("../../../../modules/costs/useCases/listByIdCompanys/ListByIdCompanysController");
var _UpdateCostByIdController = require("../../../../modules/costs/useCases/updateById/UpdateCostByIdController");
var _express = require("express");
var _ensureAdmin = require("../middlewares/ensureAdmin");
var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");
const costRoutes = (0, _express.Router)();
exports.costRoutes = costRoutes;
const createCostController = new _CreateCostController.CreateCostController();
const listByIdCompanysController = new _ListByIdCompanysController.ListByIdCompanysController();
const findByIdController = new _FindByIdController.FindCostByIdController();
const deleteCostByIdController = new _DeleteCostByIdController.DeleteCostByIdController();
const updateCostByIdController = new _UpdateCostByIdController.UpdateCostByIdController();
costRoutes.post("/:idCompanys", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, createCostController.handle);
costRoutes.get("/:idCost", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, findByIdController.handle);
costRoutes.get("/idCompany/:idCompanys", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, listByIdCompanysController.handle);
costRoutes.delete("/:idCost", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, deleteCostByIdController.handle);
costRoutes.put("/:idCost", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, updateCostByIdController.handle);