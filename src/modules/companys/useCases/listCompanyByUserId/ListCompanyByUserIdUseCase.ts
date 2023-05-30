import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICompanyModel } from "@modules/companys/infra/mongoose/entities/Companys";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListCompanyByUserIdUseCase {
    constructor(
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository,
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute(idUsers: string): Promise<ICompanyModel[]> {
        const companys = await this.companysRepository.listByUserId(idUsers);

        return companys;
    }
}
