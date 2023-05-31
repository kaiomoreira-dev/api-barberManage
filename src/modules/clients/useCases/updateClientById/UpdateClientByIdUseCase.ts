/* eslint-disable import/no-unresolved */
import { ensureAddress } from "@ensures/ensureAddress";
import { ensureEsqd } from "@ensures/ensureEsqd";
import { ensureName } from "@ensures/ensureName";
import { ensureNumber } from "@ensures/ensureNumber";
import { ensurePG } from "@ensures/ensurePG";
import { ensurePhone } from "@ensures/ensurePhone";
import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateClientByIdUseCase {
    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository
    ) {}

    async execute({
        id,
        name,
        address,
        esqd,
        num,
        pg,
        phone,
        debit,
    }: ICreateClientDTO): Promise<void> {
        const checkClientExist = await this.clientsRepository.findById(id);

        if (!checkClientExist) {
            throw new AppError("Client not found", 404);
        }

        if (!ensureName(name)) {
            throw new AppError("Name is not available", 401);
        }

        // VERIFICAR OUTRA FORMA DE FAZER ESSA VERIFICAÇÃO, POIS SE VAI ALTERAR ALGUM OUTRO ATRIBUTO NÃO CONSGUE, POIS O NOME É O MESMO
        // const checkCompanyExists = await this.clientsRepository.findByName(
        //     name
        // );

        // if (checkCompanyExists) {
        //     throw new AppError("client already exists", 401);
        // }

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

        await this.clientsRepository.updatedById({
            id,
            name,
            address,
            esqd,
            num,
            pg,
            phone,
            debit,
        });
    }
}
