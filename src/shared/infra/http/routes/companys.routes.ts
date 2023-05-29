import { CreateCompanyController } from "@modules/companys/useCases/createCompany/CreateCompanyController";
import { DeleteCompanyByIdController } from "@modules/companys/useCases/deleteById/DeleteCompanysByIdController";
import { FindCompanyByIdController } from "@modules/companys/useCases/findById/FindCompanyByIdController";
import { ListCompanysController } from "@modules/companys/useCases/listCompanys/ListCompanysController";
import { UpdateCompanyByIdController } from "@modules/companys/useCases/updateById/UpdateCompanysByIdController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const companysRoutes = Router();

const createCompanyController = new CreateCompanyController();

const findCompanyByIdController = new FindCompanyByIdController();

const listCompanysController = new ListCompanysController();

const updateCompanyByIdController = new UpdateCompanyByIdController();

const deleteCompanyByIdController = new DeleteCompanyByIdController();

companysRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    createCompanyController.handle
);
companysRoutes.get(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    listCompanysController.handle
);
companysRoutes.get(
    "/:idCompanys",
    ensureAuthenticate,
    ensureAdmin,
    findCompanyByIdController.handle
);
companysRoutes.put(
    "/:idCompanys",
    ensureAuthenticate,
    ensureAdmin,
    updateCompanyByIdController.handle
);
companysRoutes.delete(
    "/:idCompanys",
    ensureAuthenticate,
    ensureAdmin,
    deleteCompanyByIdController.handle
);
