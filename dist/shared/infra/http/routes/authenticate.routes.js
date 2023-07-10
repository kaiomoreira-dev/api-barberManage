"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticatesRoutes = void 0;
var _AuthenticateUserController = require("../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController");
var _RefreshTokenController = require("../../../../modules/accounts/useCases/refreshToken/RefreshTokenController");
var _express = require("express");
const authenticatesRoutes = (0, _express.Router)();
exports.authenticatesRoutes = authenticatesRoutes;
const authenticateUserController = new _AuthenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
authenticatesRoutes.post("/api/sessions", authenticateUserController.handle);
authenticatesRoutes.post("/api/refresh-token", refreshTokenController.handle);