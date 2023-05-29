import { CreateCostController } from '@modules/costs/useCases/createCost/CreateCostController';

import { Router } from 'express';

export const costRoutes = Router();

const createCostContoller = new CreateCostController();

costRoutes.post('/:idCompanys', createCostContoller.handle);
