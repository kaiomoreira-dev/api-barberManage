import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListServicesByCompanyIdUseCase {
	constructor(
		@inject("ServicesRepository")
		private servicesRepository: IServicesRepository,
		@inject("CompanysRepository")
		private companysRepository: ICompanysRepository
	) {}

	async execute(idCompanys: string): Promise<IServiceModel[]> {
		const checkServiceExists = await this.companysRepository.findById(idCompanys);

		if (!checkServiceExists) {
			throw new AppError("Company not found", 404);
		}

		const companys = await this.servicesRepository.listByCompanyId(idCompanys);

		return companys;
	}
}
