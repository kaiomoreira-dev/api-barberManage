import { CreateServiceExecutedController } from "@modules/servicesExcuted/useCases/createServiceExecuted/CreateServiceExecutedController";
import { DeleteServiceExecutedByIdController } from "@modules/servicesExcuted/useCases/deleteServiceExecutedById/DeleteServiceExecutedByIdController";
import { FindServiceExecutedByIdController } from "@modules/servicesExcuted/useCases/findServiceExecutedById/FindServiceExecutedByIdController";
import { ListServiceExecutedByClientIdController } from "@modules/servicesExcuted/useCases/ListServiceExecutedByClientId/ListServiceExecutedByClientIdController";
import { ListServiceExecutedByCompanyIdController } from "@modules/servicesExcuted/useCases/listServiceExecutedByCompanyId/ListServiceExecutedByCompanyIdController";
import { ListServiceExecutedByServiceIdController } from "@modules/servicesExcuted/useCases/listServiceExecutedByServiceId/ListServiceExecutedByServiceIdController";
import { UpdateServiceExecutedByIdController } from "@modules/servicesExcuted/useCases/updateServiceExecutedById/UpdateServiceExecutedByIdController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureEmployee } from "../middlewares/ensureEmployee";

export const servicesExcuteds = Router();

const createServiceExecutedController = new CreateServiceExecutedController();

const findServiceExecutedByIdController =
    new FindServiceExecutedByIdController();

const listServiceExecutedByClientIdController =
    new ListServiceExecutedByClientIdController();

const listServiceExecutedByCompanyIdController =
    new ListServiceExecutedByCompanyIdController();

const listServiceExecutedByServiceIdController =
    new ListServiceExecutedByServiceIdController();

const updateServiceExecutedByIdController =
    new UpdateServiceExecutedByIdController();

const deleteServiceExecutedByIdController =
    new DeleteServiceExecutedByIdController();

servicesExcuteds.post(
    "/:idClients/:idCompanys",
    ensureAuthenticate,
    ensureEmployee,
    createServiceExecutedController.handle
);

servicesExcuteds.get(
    "/:idServiceExecuted",
    ensureAuthenticate,
    ensureEmployee,
    findServiceExecutedByIdController.handle
);

servicesExcuteds.get(
    "/client/:idClients",
    ensureAuthenticate,
    ensureEmployee,
    listServiceExecutedByClientIdController.handle
);

servicesExcuteds.get(
    "/company/:idCompanys",
    ensureAuthenticate,
    ensureEmployee,
    listServiceExecutedByCompanyIdController.handle
);

servicesExcuteds.get(
    "/service/:idServices",
    ensureAuthenticate,
    ensureEmployee,
    listServiceExecutedByServiceIdController.handle
);

servicesExcuteds.delete(
    "/:idServiceExecuted",
    ensureAuthenticate,
    ensureAdmin,
    deleteServiceExecutedByIdController.handle
);

servicesExcuteds.put(
    "/:idServiceExecuted",
    ensureAuthenticate,
    ensureAdmin,
    updateServiceExecutedByIdController.handle
);
