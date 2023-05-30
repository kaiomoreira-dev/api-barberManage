import { IUserModel } from "@modules/accounts/infra/mongoose/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListUsersByCompanyIdUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute(idCompanys: string): Promise<IUserModel[]> {
        const checkCompanyExist = await this.companysRepository.findById(
            idCompanys
        );

        if (!checkCompanyExist) {
            throw new AppError("Company not found", 404);
        }

        const users = await this.usersRepository.ListByCompanyId(idCompanys);

        return users;
    }
}
