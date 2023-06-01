import { ensureId } from "@ensures/ensureId";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { IUserModel } from "@modules/accounts/infra/mongoose/entities/Users";
import { ListUsersMap } from "@modules/accounts/mappers/ListUsersMap";
import { UserMap } from "@modules/accounts/mappers/UserMap";
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

    async execute(idCompanys: string): Promise<IUserResponseDTO[]> {
        if (!ensureId(idCompanys)) {
            throw new AppError("Company not found", 401);
        }
        const checkCompanyExist = await this.companysRepository.findById(
            idCompanys
        );

        if (!checkCompanyExist) {
            throw new AppError("Company not found", 404);
        }

        const users = (await this.usersRepository.listByCompanyId(
            idCompanys
        )) as unknown as IUserResponseDTO[];

        return ListUsersMap.toDTOArray(users);
    }
}
