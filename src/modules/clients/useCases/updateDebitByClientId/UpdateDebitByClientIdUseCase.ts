/* eslint-disable import/no-unresolved */
import { ensureId } from "@ensures/ensureId";
import { ensurePrice } from "@ensures/ensurePrice";
import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";
import { IClientModel } from "@modules/clients/infra/mongoose/entities/Clients";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateDebitByClientIdUseCase {
    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository
    ) {}

    async execute({ id, debit }: ICreateClientDTO): Promise<void> {
        if (!ensureId(id)) {
            throw new AppError("Client not found", 401);
        }

        if (!ensurePrice(debit)) {
            throw new AppError("Value not valid", 401);
        }

        const checkClientIdExists = (await this.clientsRepository.findById(
            id
        )) as IClientModel;

        if (!checkClientIdExists) {
            throw new AppError("client not found", 404);
        }

        await this.clientsRepository.updateDebitByClientId(id, debit);
    }
}
