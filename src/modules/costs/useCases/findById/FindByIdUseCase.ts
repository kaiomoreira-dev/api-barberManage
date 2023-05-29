import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { ICostsRepository } from '@modules/costs/repositories/ICostsRepository';
import { ICostModel } from '@modules/costs/infra/entities/Cost';
import { ICreateCostsDTO } from '@modules/costs/dtos/ICreateCostsDTO';

@injectable()
export class FindCostByIdUseCase {
	constructor(
		@inject('CostsRepository')
		private costRepository: ICostsRepository
	) {}

	async execute({ id }: ICreateCostsDTO): Promise<ICostModel> {
		const checkCostExists = this.costRepository.findById(id);

		if (!checkCostExists) {
			throw new AppError('Cost not found', 404);
		}

		return checkCostExists;
	}
}
