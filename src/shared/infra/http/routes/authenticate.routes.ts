import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

export const authenticatesRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

const refreshTokenController = new RefreshTokenController();

authenticatesRoutes.post("/api/sessions", authenticateUserController.handle);

authenticatesRoutes.post("/api/refresh-token", refreshTokenController.handle);
