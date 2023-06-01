import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { IUserModel } from "@modules/accounts/infra/mongoose/entities/Users";
import { ListUsersMap } from "@modules/accounts/mappers/ListUsersMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute(): Promise<IUserResponseDTO[]> {
        const users =
            (await this.userRepository.list()) as unknown as IUserResponseDTO[];

        return ListUsersMap.toDTOArray(users);
    }
}
