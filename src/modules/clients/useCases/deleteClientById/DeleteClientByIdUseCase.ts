import { ensureId } from "@ensures/ensureId";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICreateCompanysDTO } from "@modules/companys/dtos/ICreateCompanysDTO";
import { IServiceExecutedRepository } from "@modules/servicesExcuteds/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteClientByIdUseCase {
    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository,
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository
    ) {}

    async execute({ id }: ICreateCompanysDTO): Promise<void> {
        if (!ensureId(id)) {
            throw new AppError("Client not found", 404);
        }

        const checkClientExist = await this.clientsRepository.findById(id);

        if (!checkClientExist) {
            throw new AppError("Client not found", 404);
        }

        const checkExistServiceExcuted =
            await this.serviceExecutedRepository.listByClientsId(
                checkClientExist.id
            );

        if (checkExistServiceExcuted.length > 0) {
            throw new AppError(
                "Cannot delete client when there is a related executed service",
                404
            );
        }

        await this.clientsRepository.deleteById(id);
    }
}
