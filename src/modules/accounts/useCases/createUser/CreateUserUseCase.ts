/* eslint-disable import/no-extraneous-dependencies */
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { ensureEmail } from "@modules/accounts/ensures/users/ensureEmail";
import { ensureName } from "@modules/accounts/ensures/users/ensureName";
import { ensurePassword } from "@modules/accounts/ensures/users/ensurePassword";
import { IUserModel } from "@modules/accounts/infra/mongoose/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({
        name,
        email,
        password,
        address,
    }: ICreateUserDTO): Promise<IUserModel> {
        if (ensureName(name)) {
            throw new AppError("Name is not available", 401);
        }

        const isValidEmail = ensureEmail(email);
        if (!isValidEmail) {
            throw new AppError("Email not valid", 401);
        }

        const checkEmailUserExist = await this.userRepository.findByEmail(
            email
        );

        if (checkEmailUserExist) {
            throw new AppError("Email already exists", 401);
        }

        if (ensurePassword(password)) {
            throw new AppError("Password low lenght", 401);
        }

        const passwordHash = await hash(password, 8);

        // Validar se compania existe!!

        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            address,
        });

        return user;
    }
}
