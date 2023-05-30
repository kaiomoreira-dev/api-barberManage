/* eslint-disable import/no-unresolved */
import { ensureAddress } from "@ensures/ensureAddress";
import { ensureName } from "@ensures/ensureName";
import { ensurePhone } from "@ensures/ensurePhone";
import { ICreateCompanysDTO } from "@modules/companys/dtos/ICreateCompanysDTO";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateCompanyByIdUseCase {
	constructor(
		@inject("CompanysRepository")
		private companysRepository: ICompanysRepository
	) {}

	async execute({ id, address, name, phone }: ICreateCompanysDTO): Promise<void> {
		const checkCompanyExist = await this.companysRepository.findById(id);
		if (!checkCompanyExist) {
			throw new AppError("Company not found", 404);
		}

		if (!ensureName(name)) {
			throw new AppError("Name is not available", 401);
		}

		// const checkCompanyExists = await this.companysRepository.findByName(
		//     name
		// );

		// if (checkCompanyExists) {
		//     throw new AppError("Company already exists", 401);
		// }

		if (!ensureAddress(address)) {
			throw new AppError("address is not available", 401);
		}

		// add test for phone in jest
		if (!ensurePhone(phone)) {
			throw new AppError("phone is not available", 401);
		}

		await this.companysRepository.updateById({
			id,
			name,
			address,
			phone,
		});
	}
}
