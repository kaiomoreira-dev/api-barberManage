import { CreateServiceController } from "@modules/services/useCases/createService/CreateServiceController";
import { DeleteServiceByIdController } from "@modules/services/useCases/deleteServiceById/DeleteServiceByIdController";
import { FindServiceByIdController } from "@modules/services/useCases/findServiceById/FindServiceByIdController";
import { ListServiceController } from "@modules/services/useCases/listServices/ListServicesControlle";
import { ListServicesByCompanyIdController } from "@modules/services/useCases/listServicesByCompanyId/ListServicesByCompanyIdController";
import { UpdateServiceByIdController } from "@modules/services/useCases/updateServiceById/UpdateServiceByIdController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const servicesRoutes = Router();

const createServiceController = new CreateServiceController();

const listServiceController = new ListServiceController();

const listServicesByCompanyIdController =
    new ListServicesByCompanyIdController();

const updateServiceByIdController = new UpdateServiceByIdController();

const findServiceByIdController = new FindServiceByIdController();

const deleteServiceByIdController = new DeleteServiceByIdController();

servicesRoutes.post(
    "/:idCompanys",
    ensureAuthenticate,
    ensureAdmin,
    createServiceController.handle
);
servicesRoutes.get(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    listServiceController.handle
);
servicesRoutes.get(
    "/companys/:idCompanys",
    ensureAuthenticate,
    ensureAdmin,
    listServicesByCompanyIdController.handle
);
servicesRoutes.get(
    "/:idServices",
    ensureAuthenticate,
    ensureAdmin,
    findServiceByIdController.handle
);
servicesRoutes.put(
    "/:idServices",
    ensureAuthenticate,
    ensureAdmin,
    updateServiceByIdController.handle
);
servicesRoutes.delete(
    "/:idServices",
    ensureAuthenticate,
    ensureAdmin,
    deleteServiceByIdController.handle
);
