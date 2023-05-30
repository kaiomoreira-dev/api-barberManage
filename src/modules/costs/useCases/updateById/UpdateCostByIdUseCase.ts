import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ICreateCostsDTO } from "@modules/costs/dtos/ICreateCostsDTO";
import { ICostModel } from "@modules/costs/infra/entities/Cost";
import { ICostsRepository } from "@modules/costs/repositories/ICostsRepository";
import { ensureName } from "ensures/ensureName";
import { ensurePrice } from "ensures/ensurePrice";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateCostByIdUseCase {
	constructor(
		@inject("CostsRepository")
		private costRepository: ICostsRepository,
		@inject("CompanysRepository")
		private companysRepository: ICompanysRepository
	) {}

	async execute({ id, description, idCompanys, value, costDate }: ICreateCostsDTO): Promise<void> {
		if (!ensureName(description)) {
			throw new AppError("Description is not available", 401);
		}

		const checkCompanyExists = await this.companysRepository.findById(idCompanys);

		if (!checkCompanyExists) {
			throw new AppError("Company not found", 401);
		}

		const checkCostExists = await this.costRepository.findById(id);

		if (!checkCostExists) {
			throw new AppError("Cost not found", 401);
		}

		if (!ensurePrice(value)) {
			throw new AppError("Value not valid", 401);
		}

		await this.costRepository.updateById({
			id,
			description,
			idCompanys,
			value,
			costDate,
		});
	}
}
