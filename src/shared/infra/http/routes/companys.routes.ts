import { CreateCompanysController } from "@modules/companys/useCases/createCompany/CreateCompanysController";
import { Router } from "express";

export const companysRoutes = Router();

const createCompanysController = new CreateCompanysController();

companysRoutes.post("/:idUsers", createCompanysController.handle);
