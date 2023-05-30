/* eslint-disable import/no-extraneous-dependencies */
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUserModel } from "@modules/accounts/infra/mongoose/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { hash } from "bcrypt";
import { ensureEmail } from "ensures/ensureEmail";
import { ensureId } from "ensures/ensureId";
import { ensureName } from "ensures/ensureName";
import { ensurePassword } from "ensures/ensurePassword";
import { ensurePhone } from "ensures/ensurePhone";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute({
        name,
        email,
        password,
        address,
        phone,
        idCompanys,
    }: ICreateUsersDTO): Promise<IUserModel> {
        if (!ensureName(name)) {
            throw new AppError("Name is not available", 401);
        }

        if (!ensureEmail(email)) {
            throw new AppError("Email not valid", 401);
        }

        if (!ensurePhone(phone)) {
            throw new AppError("phone is not available", 401);
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
        if (!ensureId(idCompanys)) {
            throw new AppError("Company not found", 401);
        }

        const checkCompanyExists = await this.companysRepository.findById(
            idCompanys
        );

        if (!checkCompanyExists) {
            throw new AppError("Company not found", 401);
        }

        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            address,
            phone,
            idCompanys,
        });

        return user;
    }
}
