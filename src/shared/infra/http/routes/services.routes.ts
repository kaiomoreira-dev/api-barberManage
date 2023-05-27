import { CreateServiceController } from "@modules/services/useCases/createService/CreateServiceController";
import { DeleteServiceByIdController } from "@modules/services/useCases/deleteServiceById/DeleteServiceByIdController";
import { FindServiceByCompanyIdController } from "@modules/services/useCases/findServiceByCompanyId/FindServiceByCompanyIdController";
import { FindServiceByIdController } from "@modules/services/useCases/findServiceById/FindServiceByIdController";
import { ListServiceController } from "@modules/services/useCases/listServices/ListServicesControlle";
import { UpdateServiceByIdController } from "@modules/services/useCases/updateServiceById/UpdateServiceByIdController";
import { Router } from "express";

export const servicesRoutes = Router();

const createServiceController = new CreateServiceController();

const listServiceController = new ListServiceController();

const updateServiceByIdController = new UpdateServiceByIdController();

const findServiceByIdController = new FindServiceByIdController();

const findServiceByCompanyIdController = new FindServiceByCompanyIdController();

const deleteServiceByIdController = new DeleteServiceByIdController();

servicesRoutes.post("/:idCompanys", createServiceController.handle);

servicesRoutes.get("/", listServiceController.handle);

servicesRoutes.get("/:idServices", findServiceByIdController.handle);

servicesRoutes.get(
    "/companys/:idCompanys",
    findServiceByCompanyIdController.handle
);

servicesRoutes.put("/:idServices", updateServiceByIdController.handle);

servicesRoutes.delete("/:idServices", deleteServiceByIdController.handle);
