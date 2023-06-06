import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserByIdController } from "@modules/accounts/useCases/deleteById/DeleteUserByIdController";
import { FindUserByIdController } from "@modules/accounts/useCases/findUserById/FindUserByIdController";
import { ListUsersByCompanyIdController } from "@modules/accounts/useCases/listUserByCompanyId/ListUsersByCompanyIdController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUsersController } from "@modules/accounts/useCases/updateUser/UpdateUsersController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureEmployee } from "../middlewares/ensureEmployee";

export const usersRoutes = Router();

const createUserController = new CreateUserController();

const findUserByIdController = new FindUserByIdController();

const listUsersByCompanyIdController = new ListUsersByCompanyIdController();

const updateUsersController = new UpdateUsersController();

const deleteUserByIdController = new DeleteUserByIdController();

const listUsersController = new ListUsersController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get(
    "/:idUsers",
    ensureAuthenticate,
    ensureAdmin,
    findUserByIdController.handle
);

usersRoutes.get(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    listUsersController.handle
);

usersRoutes.get(
    "/company/:idCompanys",
    ensureAuthenticate,
    ensureAdmin,
    listUsersByCompanyIdController.handle
);

usersRoutes.put(
    "/:idUsers",
    ensureAuthenticate,
    ensureAdmin,
    updateUsersController.handle
);

usersRoutes.delete(
    "/:idUsers",
    ensureAuthenticate,
    ensureAdmin,
    deleteUserByIdController.handle
);

// criar rota para atualizar qualquer user para administrador
// Mas com apenas permissão de desenvolvedor
