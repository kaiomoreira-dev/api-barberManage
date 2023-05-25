"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = require("express");
var _companys = require("./companys.routes");
var _users = require("./users.routes");
const router = (0, _express.Router)();
exports.router = router;
router.use("/api/users", _users.usersRoutes);
router.use("/api/companys", _companys.companysRoutes);