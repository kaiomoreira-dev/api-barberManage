import { CreateCompanyController } from "@modules/companys/useCases/createCompany/CreateCompanyController";
import { DeleteCompanyByIdController } from "@modules/companys/useCases/deleteById/DeleteCompanysByIdController";
import { FindCompanyByIdController } from "@modules/companys/useCases/findCompanyById/FindCompanyByIdController";
import { ListCompanysController } from "@modules/companys/useCases/listCompanys/ListCompanysController";
import { UpdateCompanyByIdController } from "@modules/companys/useCases/updateById/UpdateCompanysByIdController";
import { Router } from "express";

export const companysRoutes = Router();

const createCompanyController = new CreateCompanyController();

const listCompanysController = new ListCompanysController();

const findCompanyByIdController = new FindCompanyByIdController();

const updateCompanyByIdController = new UpdateCompanyByIdController();

const deleteCompanyByIdController = new DeleteCompanyByIdController();

companysRoutes.post("/:idUsers", createCompanyController.handle);

companysRoutes.get("/", listCompanysController.handle);

companysRoutes.get("/:idCompanys", findCompanyByIdController.handle);

companysRoutes.put("/:idCompanys", updateCompanyByIdController.handle);

companysRoutes.delete("/:idCompanys", deleteCompanyByIdController.handle);
