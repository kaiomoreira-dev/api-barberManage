import { ensureId } from "@ensures/ensureId";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateCompanysDTO } from "@modules/companys/dtos/ICreateCompanysDTO";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteCompanyByIdUseCase {
    constructor(
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository,
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({ id }: ICreateCompanysDTO): Promise<void> {
        if (!ensureId(id)) {
            throw new AppError("Company not found", 404);
        }

        const checkCompanyExist = await this.companysRepository.findById(id);

        if (!checkCompanyExist) {
            throw new AppError("Company not found", 404);
        }

        await this.companysRepository.deleteById(id);

        await this.userRepository.updateCompanysIdsByCompanyId(id);
    }
}
