import { CreateCostController } from '@modules/costs/useCases/createCost/CreateCostController';
import { ListByIdCompanysController } from '@modules/costs/useCases/listByIdCompanys/ListByIdCompanysController';

import { Router } from 'express';

export const costRoutes = Router();

const createCostController = new CreateCostController();
const listByIdCompanysController = new ListByIdCompanysController();

costRoutes.post('/:idCompanys', createCostController.handle);
costRoutes.get('/:idCompanys', listByIdCompanysController.handle);
