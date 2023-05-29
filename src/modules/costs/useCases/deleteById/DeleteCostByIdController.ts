import { DeleteCostByIdUseCase } from './DeleteCostByIdUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DeleteCostByIdController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { idCost } = request.params;

		const deleteCostByIdUseCase = container.resolve(DeleteCostByIdUseCase);

		await deleteCostByIdUseCase.execute({ id: idCost });

		return response.status(200).json({ message: 'Deleted Cost successfully.' });
	}
}
