import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersByCompanyIdController } from "@modules/accounts/useCases/listUserByCompaniId/ListUsersByCompaniIdController";
import { UpdateUsersController } from "@modules/accounts/useCases/updateUser/UpdateUsersController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const usersRoutes = Router();

const createUserController = new CreateUserController();

const listUsersByCompanyIdController = new ListUsersByCompanyIdController();

const updateUsersController = new UpdateUsersController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get(
    "/:idCompanys",
    ensureAuthenticate,
    listUsersByCompanyIdController.handle
);

usersRoutes.put("/", ensureAuthenticate, updateUsersController.handle);

// criar rota para atualizar qualquer user para administrador
// Mas com apenas permissão de desenvolvedor
