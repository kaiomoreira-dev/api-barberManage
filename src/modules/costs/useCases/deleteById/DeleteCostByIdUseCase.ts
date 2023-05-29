import { ICreateCostsDTO } from '@modules/costs/dtos/ICreateCostsDTO';
import { ICostsRepository } from '@modules/costs/repositories/ICostsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteCostByIdUseCase {
	constructor(
		@inject('CostsRepository')
		private costRepository: ICostsRepository
	) {}

	async execute({ id }: ICreateCostsDTO): Promise<void> {
		const checkCostExists = await this.costRepository.findById(id);

		if (!checkCostExists) {
			throw new AppError('Cost not found', 404);
		}

		await this.costRepository.deleteById(id);
	}
}
