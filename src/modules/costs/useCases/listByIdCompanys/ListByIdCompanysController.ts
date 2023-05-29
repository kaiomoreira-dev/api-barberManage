/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListByIdCompanysUseCase } from './ListByIdCompnaysUseCase';

export class ListByIdCompanysController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { idCompanys } = request.params;

		const listByIdCopmanysUseCase = container.resolve(ListByIdCompanysUseCase);

		const costs = await listByIdCopmanysUseCase.execute({
			id: idCompanys,
		});

		return response.status(200).json(costs);
	}
}
