/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { ensureEmail } from "@ensures/ensureEmail";
import { ensureId } from "@ensures/ensureId";
import { ensureName } from "@ensures/ensureName";
import { ensurePassword } from "@ensures/ensurePassword";
import { ensurePhone } from "@ensures/ensurePhone";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUserModel } from "@modules/accounts/infra/mongoose/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { hash } from "bcrypt";
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
        for (const company of idCompanys) {
            if (!ensureId(String(company))) {
                throw new AppError("Company not found", 401);
            }

            // eslint-disable-next-line no-await-in-loop
            const checkCompanyExists = await this.companysRepository.findById(
                String(company)
            );

            if (!checkCompanyExists) {
                throw new AppError("Company not found", 401);
            }
        }

        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            address,
            phone,
            idCompanys,
        });

        if (idCompanys.length > 0) {
            for (const company of user.idCompanys) {
                // eslint-disable-next-line no-await-in-loop
                await this.companysRepository.updateListUsersById(
                    String(company),
                    user.id
                );
            }
        }

        return user;
    }
}
