import { CreateCostController } from "@modules/costs/useCases/createCost/CreateCostController";
import { DeleteCostByIdController } from "@modules/costs/useCases/deleteById/DeleteCostByIdController";
import { FindCostByIdController } from "@modules/costs/useCases/findById/FindByIdController";
import { ListByIdCompanysController } from "@modules/costs/useCases/listByIdCompanys/ListByIdCompanysController";
import { UpdateCostByIdController } from "@modules/costs/useCases/updateById/UpdateCostByIdController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const costRoutes = Router();

const createCostController = new CreateCostController();
const listByIdCompanysController = new ListByIdCompanysController();
const findByIdController = new FindCostByIdController();
const deleteCostByIdController = new DeleteCostByIdController();
const updateCostByIdController = new UpdateCostByIdController();

costRoutes.post(
    "/:idCompanys",
    ensureAuthenticate,
    ensureAdmin,
    createCostController.handle
);
costRoutes.get(
    "/:idCost",
    ensureAuthenticate,
    ensureAdmin,
    findByIdController.handle
);
costRoutes.get(
    "/idCompany/:idCompanys",
    ensureAuthenticate,
    ensureAdmin,
    listByIdCompanysController.handle
);
costRoutes.delete(
    "/:idCost",
    ensureAuthenticate,
    ensureAdmin,
    deleteCostByIdController.handle
);
costRoutes.put(
    "/:idCost",
    ensureAuthenticate,
    ensureAdmin,
    updateCostByIdController.handle
);
