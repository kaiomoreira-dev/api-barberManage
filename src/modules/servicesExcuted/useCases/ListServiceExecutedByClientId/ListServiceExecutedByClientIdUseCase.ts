import { IClientModel } from "@modules/clients/infra/mongoose/entities/Clients";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { IServiceExecutedModel } from "@modules/servicesExcuted/infra/mongoose/entities/ServiceExecuted";
import { IServiceExecutedRepository } from "@modules/servicesExcuted/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListServiceExecutedByClientIdUseCase {
    constructor(
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository,
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository
    ) {}

    async execute(idClients: string): Promise<IServiceExecutedModel[]> {
        const checkClientExist = await this.clientsRepository.findById(
            idClients
        );

        if (!checkClientExist) {
            throw new AppError("Client not found", 404);
        }

        const servicesExecuted =
            await this.serviceExecutedRepository.listByClientsId(
                checkClientExist.id
            );

        return servicesExecuted;
    }
}
