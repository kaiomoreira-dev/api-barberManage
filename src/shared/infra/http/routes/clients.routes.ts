import { CreateClientsController } from "@modules/clients/useCases/createClient/CreateClientsController";
import { DeleteClientByIdController } from "@modules/clients/useCases/deleteClientById/DeleteClientByIdController";
import { FindClientByIdController } from "@modules/clients/useCases/findClientById/FindClientByIdController";
import { ListClientByCompanyIdController } from "@modules/clients/useCases/listClientByCompanyId/ListClientByCompanyIdController";
import { ListClientsController } from "@modules/clients/useCases/listClients/LIstClientsController";
import { UpdateClientByIdController } from "@modules/clients/useCases/updateClientById/UpdateClientByIdController";
import { UpdateDebitByClientIdController } from "@modules/clients/useCases/updateDebitByClientId/UpdateDebitByClientIdController";
import { ListCompanyByUserIdController } from "@modules/companys/useCases/listCompanyByUserId/ListCompanyByUserIdController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureEmployee } from "../middlewares/ensureEmployee";

export const clientsRoutes = Router();

const createClientsController = new CreateClientsController();

const findClientByIdController = new FindClientByIdController();

const listClientsController = new ListClientsController();

const listClientByCompanyIdController = new ListClientByCompanyIdController();

const updateClientByIdController = new UpdateClientByIdController();

const updateDebitByClientIdController = new UpdateDebitByClientIdController();

const deleteClientByIdController = new DeleteClientByIdController();

clientsRoutes.post("/", ensureAuthenticate, createClientsController.handle);
clientsRoutes.get("/", ensureAuthenticate, listClientsController.handle);

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
    ensureEmployee,
    updateClientByIdController.handle
);

clientsRoutes.patch(
    "/:idClients",
    ensureAuthenticate,
    ensureAdmin,
    updateDebitByClientIdController.handle
);

clientsRoutes.delete(
    "/:idClients",
    ensureAuthenticate,
    ensureAdmin,
    deleteClientByIdController.handle
);
