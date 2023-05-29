import { ensureName } from 'ensures/ensureName';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ICostsRepository } from '@modules/costs/repositories/ICostsRepository';
import { ICompanysRepository } from '@modules/companys/repositories/ICompanysRepository';
import { ensurePrice } from 'ensures/ensurePrice';
import { ICostModel } from '@modules/costs/infra/entities/Cost';
import { ICreateCostsDTO } from '@modules/costs/dtos/ICreateCostsDTO';

@injectable()
export class CreateCostUseCase {
	constructor(
		@inject('CostsRepository')
		private costRepository: ICostsRepository,
		@inject('CompanysRepository')
		private companysRepository: ICompanysRepository
	) {}

	async execute({
		description,
		idCompanys,
		value,
		costDate,
	}: ICreateCostsDTO): Promise<ICostModel> {
		if (!ensureName(description)) {
			throw new AppError('Description is not available', 401);
		}

		const checkCompanyExists = await this.companysRepository.findById(idCompanys);

		if (!checkCompanyExists) {
			throw new AppError('Company not found', 401);
		}

		if (!ensurePrice(value)) {
			throw new AppError('Value not valid', 401);
		}

		const company = await this.costRepository.create({
			description,
			idCompanys,
			value,
			costDate,
		});

		return company;
	}
}
