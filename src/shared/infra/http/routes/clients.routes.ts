import { CreateClientsController } from "@modules/clients/useCases/createClient/CreateClientsController";
import { DeleteClientByIdController } from "@modules/clients/useCases/deleteClientById/DeleteClientByIdController";
import { FindClientByIdController } from "@modules/clients/useCases/findClientById/FindClientByIdController";
import { ListClientByCompanyIdController } from "@modules/clients/useCases/listClientByCompanyId/ListClientByCompanyIdController";
import { ListClientsController } from "@modules/clients/useCases/listClients/LIstClientsController";
import { UpdateClientByIdController } from "@modules/clients/useCases/updateClientById/UpdateClientByIdController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureEmployee } from "../middlewares/ensureEmployee";

export const clientsRoutes = Router();

const createClientsController = new CreateClientsController();

const listClientsController = new ListClientsController();

const listClientByCompanyIdController = new ListClientByCompanyIdController();

const findClientByIdController = new FindClientByIdController();

const updateClientByIdController = new UpdateClientByIdController();

const deleteClientByIdController = new DeleteClientByIdController();

clientsRoutes.post(
    "/:idCompanys",
    ensureAuthenticate,
    ensureEmployee,
    createClientsController.handle
);
clientsRoutes.get(
    "/",
    ensureAuthenticate,
    ensureEmployee,
    listClientsController.handle
);
clientsRoutes.get(
    "/companys/:idCompanys",
    ensureAuthenticate,
    ensureEmployee,
    listClientByCompanyIdController.handle
);
clientsRoutes.get(
    "/:idClients",
    ensureAuthenticate,
    ensureEmployee,
    findClientByIdController.handle
);
clientsRoutes.put(
    "/:idClients",
    ensureAuthenticate,
    ensureAdmin,
    updateClientByIdController.handle
);
clientsRoutes.delete(
    "/:idClients",
    ensureAuthenticate,
    ensureAdmin,
    deleteClientByIdController.handle
);
