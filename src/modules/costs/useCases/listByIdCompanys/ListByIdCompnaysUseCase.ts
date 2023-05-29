import { ensureName } from 'ensures/ensureName';
import { ICreateCompanysDTO } from '@modules/companys/dtos/ICreateCompanysDTO';
import { ICompanyModel } from '@modules/companys/infra/mongoose/entities/Companys';
import { ICompanysRepository } from '@modules/companys/repositories/ICompanysRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { ICostsRepository } from '@modules/costs/repositories/ICostsRepository';
import { ICostModel } from '@modules/costs/infra/entities/Cost';

@injectable()
export class ListByIdCompanysUseCase {
	constructor(
		@inject('CostsRepository')
		private costsRepository: ICostsRepository,
		@inject('CompanysRepository')
		private companysRepository: ICompanysRepository
	) {}

	async execute({ id }: ICreateCompanysDTO): Promise<ICostModel[]> {
		const checkCompanyExist = await this.companysRepository.findById(id);

		if (!checkCompanyExist) {
			throw new AppError('Company not found', 404);
		}

		const costs = await this.costsRepository.listByIdCompany(id);

		return costs;
	}
}
