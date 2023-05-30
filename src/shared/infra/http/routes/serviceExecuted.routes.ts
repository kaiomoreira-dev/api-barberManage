import { CreateServiceExecutedController } from "@modules/servicesExcuted/useCases/createServiceExecuted/CreateServiceExecutedController";
import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureEmployee } from "../middlewares/ensureEmployee";

export const servicesExcuteds = Router();

const createServiceExecutedController = new CreateServiceExecutedController();

servicesExcuteds.post(
    "/:idClients/:idCompanys",
    ensureAuthenticate,
    ensureEmployee,
    createServiceExecutedController.handle
);
