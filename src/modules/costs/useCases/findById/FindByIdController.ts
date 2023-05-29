/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCostByIdUseCase } from './FindByIdUseCase';

export class FindCostByIdController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { idCost } = request.params;

		const findCostByIdUseCase = container.resolve(FindCostByIdUseCase);

		const company = await findCostByIdUseCase.execute({
			id: idCost,
		});

		return response.status(201).json(company);
	}
}
