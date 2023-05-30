import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}
    async execute({
        id,
        name,
        email,
        address,
        phone,
    }: ICreateUsersDTO): Promise<void> {
        const checkUserdExists = this.userRepository.findById(id);

        if (!checkUserdExists) {
            throw new AppError("User not found", 404);
        }

        await this.userRepository.updateById({
            id,
            name,
            email,
            address,
            phone,
        });
    }
}
