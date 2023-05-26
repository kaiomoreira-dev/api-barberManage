import { ICreateCompanysDTO } from "@modules/companys/dtos/ICreateCompanysDTO";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteCompanyByIdUseCase {
    constructor(
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute({ id }: ICreateCompanysDTO): Promise<void> {
        const checkCompanyExist = await this.companysRepository.findById(id);

        if (!checkCompanyExist) {
            throw new AppError("Company not found", 404);
        }

        await this.companysRepository.deleteById(id);
    }
}
