"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = require("express");
var _authenticate = require("./authenticate.routes");
var _clients = require("./clients.routes");
var _companys = require("./companys.routes");
var _costs = require("./costs.routes");
var _serviceExecuted = require("./serviceExecuted.routes");
var _services = require("./services.routes");
var _users = require("./users.routes");
const router = (0, _express.Router)();
exports.router = router;
router.use("/api/users", _users.usersRoutes);
router.use("/api/companys", _companys.companysRoutes);
router.use("/api/services", _services.servicesRoutes);
router.use("/api/costs", _costs.costRoutes);
router.use("/api/clients", _clients.clientsRoutes);
router.use("/api/servicesExecuteds", _serviceExecuted.servicesExcuteds);
router.use(_authenticate.authenticatesRoutes);