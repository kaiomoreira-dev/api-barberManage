"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.companysRoutes = void 0;
var _CreateCompanysController = require("../../../../modules/companys/useCases/createCompany/CreateCompanysController");
var _express = require("express");
const companysRoutes = (0, _express.Router)();
exports.companysRoutes = companysRoutes;
const createCompanysController = new _CreateCompanysController.CreateCompanysController();
companysRoutes.post("/:idUsers", createCompanysController.handle);