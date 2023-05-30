import { CreateCostController } from "@modules/costs/useCases/createCost/CreateCostController";
import { DeleteCostByIdController } from "@modules/costs/useCases/deleteById/DeleteCostByIdController";
import { FindCostByIdController } from "@modules/costs/useCases/findById/FindByIdController";
import { ListByIdCompanysController } from "@modules/costs/useCases/listByIdCompanys/ListByIdCompanysController";
import { Router } from "express";

export const costRoutes = Router();

const createCostController = new CreateCostController();
const listByIdCompanysController = new ListByIdCompanysController();
const findByIdController = new FindCostByIdController();
const deleteCostByIdController = new DeleteCostByIdController();

costRoutes.post("/:idCompanys", createCostController.handle);
costRoutes.get("/:idCost", findByIdController.handle);
costRoutes.get("/idCompany/:idCompanys", listByIdCompanysController.handle);
costRoutes.delete("/:idCost", deleteCostByIdController.handle);
