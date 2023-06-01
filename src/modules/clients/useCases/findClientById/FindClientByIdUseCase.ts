import { ensureId } from "@ensures/ensureId";
import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";
import { IClientModel } from "@modules/clients/infra/mongoose/entities/Clients";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindClientByIdUseCase {
    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository
    ) {}

    async execute({ id }: ICreateClientDTO): Promise<IClientModel> {
        if (!ensureId(id)) {
            throw new AppError("Client not found", 404);
        }

        const checkClientExist = await this.clientsRepository.findById(id);

        if (!checkClientExist) {
            throw new AppError("Client not found", 404);
        }

        return checkClientExist;
    }
}
