import { ensureId } from "@ensures/ensureId";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IServiceExecutedRepository } from "@modules/servicesExcuteds/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteUserByIdUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository
    ) {}

    async execute(id: string): Promise<void> {
        if (!ensureId(id)) {
            throw new AppError("User not found", 401);
        }
        const checkUserExists = await this.userRepository.findById(id);

        if (!checkUserExists) {
            throw new AppError("User not found", 404);
        }
        const checkExistServiceExcuted =
            await this.serviceExecutedRepository.listByUserId(
                checkUserExists.id
            );

        if (checkExistServiceExcuted.length > 0) {
            throw new AppError(
                "Cannot delete user when there is a related executed service",
                404
            );
        }

        await this.userRepository.deleteById(id);
    }
}
