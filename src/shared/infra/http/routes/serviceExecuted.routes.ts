import { CreateServiceExecutedController } from "@modules/servicesExcuteds/useCases/createServiceExecuted/CreateServiceExecutedController";
import { DeleteServiceExecutedByIdController } from "@modules/servicesExcuteds/useCases/deleteServiceExecutedById/DeleteServiceExecutedByIdController";
import { FindServiceExecutedByIdController } from "@modules/servicesExcuteds/useCases/findServiceExecutedById/FindServiceExecutedByIdController";
import { ListServiceExecutedByClientIdController } from "@modules/servicesExcuteds/useCases/listServiceExecutedByClientId/ListServiceExecutedByClientIdController";
import { ListServiceExecutedByCompanyIdController } from "@modules/servicesExcuteds/useCases/listServiceExecutedByCompanyId/ListServiceExecutedByCompanyIdController";
import { ListServiceExecutedByServiceIdController } from "@modules/servicesExcuteds/useCases/listServiceExecutedByServiceId/ListServiceExecutedByServiceIdController";
import { ListServiceExecutedByUserIdController } from "@modules/servicesExcuteds/useCases/listServiceExecutedByUserId/ListServiceExecutedByUserIdController";
import { UpdateServiceExecutedByIdController } from "@modules/servicesExcuteds/useCases/updateServiceExecutedById/UpdateServiceExecutedByIdController";
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

const listServiceExecutedByUserIdController =
    new ListServiceExecutedByUserIdController();

const updateServiceExecutedByIdController =
    new UpdateServiceExecutedByIdController();

const deleteServiceExecutedByIdController =
    new DeleteServiceExecutedByIdController();

servicesExcuteds.post(
    "/",
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

servicesExcuteds.get(
    "/user/:idUsers",
    ensureAuthenticate,
    ensureEmployee,
    listServiceExecutedByUserIdController.handle
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
