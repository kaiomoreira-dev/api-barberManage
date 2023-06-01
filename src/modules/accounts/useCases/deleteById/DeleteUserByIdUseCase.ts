import { ensureId } from "@ensures/ensureId";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteUserByIdUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<void> {
        if (!ensureId(id)) {
            throw new AppError("User not found", 401);
        }
        const checkServiceExists = this.userRepository.findById(id);

        if (!checkServiceExists) {
            throw new AppError("User not found", 404);
        }

        await this.userRepository.deleteById(id);
    }
}
