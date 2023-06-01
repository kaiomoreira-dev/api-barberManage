/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { ensureId } from "@ensures/ensureId";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}
    async execute({
        id,
        name,
        email,
        address,
        phone,
        idCompanys,
    }: ICreateUsersDTO): Promise<void> {
        if (!ensureId(id)) {
            throw new AppError("User not found", 401);
        }
        const checkUserdExists = this.userRepository.findById(id);

        if (!checkUserdExists) {
            throw new AppError("User not found", 404);
        }

        for (const company of idCompanys) {
            const checkCompanyExists = await this.companysRepository.findById(
                String(company)
            );
            if (!checkCompanyExists) {
                throw new AppError("Company not found", 404);
            }
        }
        await this.userRepository.updateById({
            id,
            name,
            email,
            address,
            phone,
            idCompanys,
        });
    }
}
