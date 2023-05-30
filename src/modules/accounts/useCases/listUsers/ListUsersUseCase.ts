import { IUserModel } from "@modules/accounts/infra/mongoose/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute(): Promise<IUserModel[]> {
        const users = await this.userRepository.list();

        return users;
    }
}
