/* eslint-disable import/no-unresolved */
import { ensureAddress } from "@ensures/ensureAddress";
import { ensureName } from "@ensures/ensureName";
import { ensurePhone } from "@ensures/ensurePhone";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateCompanysDTO } from "@modules/companys/dtos/ICreateCompanysDTO";
import { ICompanyModel } from "@modules/companys/infra/mongoose/entities/Companys";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateCompanyUseCase {
    constructor(
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        idUsers,
        address,
        name,
        phone,
    }: ICreateCompanysDTO): Promise<ICompanyModel> {
        if (!ensureName(name)) {
            throw new AppError("Name is not available", 401);
        }

        const checkCompanyExists = await this.companysRepository.findByName(
            name
        );

        if (checkCompanyExists) {
            throw new AppError("Company already exists", 401);
        }

        if (!ensureAddress(address)) {
            throw new AppError("adress is not available", 401);
        }

        // add test for phone in jest
        if (!ensurePhone(phone)) {
            throw new AppError("phone is not available", 401);
        }

        const checkUserExist = await this.usersRepository.findById(idUsers);

        if (!checkUserExist) {
            throw new AppError("User not found", 404);
        }

        const company = await this.companysRepository.create({
            idUsers,
            name,
            address,
            phone,
        });

        await this.usersRepository.updateById({
            id: checkUserExist.id,
            idCompanys: company.id,
        });

        return company;
    }
}
