import { ensureId } from "@ensures/ensureId";
import { ensureName } from "@ensures/ensureName";
import { ensurePrice } from "@ensures/ensurePrice";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ICreateCostsDTO } from "@modules/costs/dtos/ICreateCostsDTO";
import { ICostModel } from "@modules/costs/infra/entities/Cost";
import { ICostsRepository } from "@modules/costs/repositories/ICostsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateCostUseCase {
    constructor(
        @inject("CostsRepository")
        private costRepository: ICostsRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute({
        description,
        idCompanys,
        value,
        costDate,
    }: ICreateCostsDTO): Promise<ICostModel> {
        if (!ensureName(description)) {
            throw new AppError("Description is not available", 401);
        }

        if (!ensureId(idCompanys)) {
            throw new AppError("Company not found", 404);
        }

        const checkCompanyExists = await this.companysRepository.findById(
            idCompanys
        );

        if (!checkCompanyExists) {
            throw new AppError("Company not found", 401);
        }

        if (!ensurePrice(value)) {
            throw new AppError("Value not valid", 401);
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
