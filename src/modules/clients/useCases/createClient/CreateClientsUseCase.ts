import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";
import { IClientModel } from "@modules/clients/infra/mongoose/entities/Clients";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ensureAddress } from "ensures/ensureAddress";
import { ensureEsqd } from "ensures/ensureEsqd";
import { ensureName } from "ensures/ensureName";
import { ensureNumber } from "ensures/ensureNumber";
import { ensurePG } from "ensures/ensurePG";
import { ensurePhone } from "ensures/ensurePhone";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateClientsUseCase {
    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute({
        idCompanys,
        name,
        address,
        esqd,
        num,
        pg,
        phone,
    }: ICreateClientDTO): Promise<IClientModel> {
        const checkCompanyExist = await this.companysRepository.findById(
            idCompanys
        );

        if (!checkCompanyExist) {
            throw new AppError("Company not found", 404);
        }

        if (!ensureName(name)) {
            throw new AppError("Name is not available", 401);
        }

        const checkCompanyExists = await this.clientsRepository.findByName(
            name
        );

        if (checkCompanyExists) {
            throw new AppError("Client already exists", 401);
        }

        if (!ensureAddress(address)) {
            throw new AppError("Adress is not available", 401);
        }

        // add test for phone in jest
        if (!ensurePhone(phone)) {
            throw new AppError("Phone is not available", 401);
        }

        if (!ensureNumber(num)) {
            throw new AppError("Number is not available", 401);
        }

        if (!ensureEsqd(esqd)) {
            throw new AppError("Esqd is not available", 401);
        }

        if (!ensurePG(pg)) {
            throw new AppError("Pg is not available", 401);
        }

        const client = await this.clientsRepository.create({
            idCompanys,
            name,
            address,
            esqd,
            num,
            pg,
            phone,
        });

        return client;
    }
}
