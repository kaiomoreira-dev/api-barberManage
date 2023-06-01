import { ensureId } from "@ensures/ensureId";
import { ICreateCompanysDTO } from "@modules/companys/dtos/ICreateCompanysDTO";
import { ICompanyModel } from "@modules/companys/infra/mongoose/entities/Companys";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindCompanyByIdUseCase {
    constructor(
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute({
        id,
    }: ICreateCompanysDTO): Promise<ICompanyModel | boolean> {
        if (!ensureId(id)) {
            throw new AppError("Company not found", 404);
        }

        const checkCompanyExists = this.companysRepository.findById(id);

        if (!checkCompanyExists) {
            throw new AppError("Company not found", 404);
        }

        return checkCompanyExists;
    }
}
