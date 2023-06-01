import { ensureId } from "@ensures/ensureId";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mappers/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindUserByIdUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<IUserResponseDTO> {
        if (!ensureId(id)) {
            throw new AppError("User not found", 401);
        }
        const checkUserExists = (await this.userRepository.findById(
            id
        )) as unknown as IUserResponseDTO;

        if (!checkUserExists) {
            throw new AppError("User not found", 404);
        }
        return UserMap.toDTO(checkUserExists);
    }
}
