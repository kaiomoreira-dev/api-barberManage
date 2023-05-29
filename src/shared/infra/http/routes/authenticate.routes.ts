import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";

export const authenticatesRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticatesRoutes.post("/api/sessions", authenticateUserController.handle);
