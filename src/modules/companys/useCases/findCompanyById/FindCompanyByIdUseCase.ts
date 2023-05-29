import { ensureName } from 'ensures/ensureName';
import { ICreateCompanysDTO } from '@modules/companys/dtos/ICreateCompanysDTO';
import { ICompanyModel } from '@modules/companys/infra/mongoose/entities/Companys';
import { ICompanysRepository } from '@modules/companys/repositories/ICompanysRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
export class FindCompanyByIdUseCase {
	constructor(
		@inject('CompanysRepository')
		private companysRepository: ICompanysRepository
	) {}

	async execute({ id }: ICreateCompanysDTO): Promise<ICompanyModel> {
		const checkCompanyExist = await this.companysRepository.findById(id);

		if (!checkCompanyExist) {
			throw new AppError('Company not found', 404);
		}

		const company = await this.companysRepository.findById(id);

		return company;
	}
}
