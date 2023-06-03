import { ensureId } from "@ensures/ensureId";
import { ICreateCompanysDTO } from "@modules/companys/dtos/ICreateCompanysDTO";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ICostModel } from "@modules/costs/infra/entities/Cost";
import { ICostsRepository } from "@modules/costs/repositories/ICostsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListByIdCompanysUseCase {
    constructor(
        @inject("CostsRepository")
        private costsRepository: ICostsRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute({ id }: ICreateCompanysDTO): Promise<ICostModel[]> {
        if (!ensureId(id)) {
            throw new AppError("Service not found", 404);
        }
        const checkCompanyExist = await this.companysRepository.findById(id);

        if (!checkCompanyExist) {
            throw new AppError("Company not found", 404);
        }

        const costs = await this.costsRepository.listByIdCompany(id);

        return costs;
    }
}
