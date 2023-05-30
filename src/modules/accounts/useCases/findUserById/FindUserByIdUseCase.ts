import { IUserModel } from "@modules/accounts/infra/mongoose/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateCompanysDTO } from "@modules/companys/dtos/ICreateCompanysDTO";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindUserByIdUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({ id }: ICreateCompanysDTO): Promise<IUserModel> {
        const checkUserExists = this.userRepository.findById(id);

        if (!checkUserExists) {
            throw new AppError("Company not found", 404);
        }

        return checkUserExists;
    }
}
